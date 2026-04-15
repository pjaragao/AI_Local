import { Queue, Worker } from 'bullmq';
import IORedis from 'ioredis';
import { ScraperService } from '../modules/scraping/services/ScraperService';
import { AIProviderFactory } from '../modules/ai/providers/AIProviderFactory';
import { prisma } from '../shared/infra/http/prisma';

const connection = new IORedis({
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
  maxRetriesPerRequest: null,
});

const scrapingQueue = new Queue('scraping', { connection });

const scraperService = new ScraperService();

const worker = new Worker('scraping', async (job) => {
  const { sourceId } = job.data;

  const source = await prisma.informationSource.findUnique({
    where: { id: sourceId }
  });

  if (!source || source.status !== 'active') return;

  try {
    // 1. Scrape Content
    const { title, content } = await scraperService.execute({
      url: source.url,
      config: source.scraper_config as any
    });

    // 2. Process with AI (Using a default prompt for news processing)
    const systemPrompt = await prisma.systemPrompt.findFirst({
      where: { name: 'EXTRACTION_NEWS' }
    });

    if (!systemPrompt) throw new Error('System prompt not found');

    const aiProvider = AIProviderFactory.getProvider(systemPrompt.ai_provider as any);
    const processedData = await aiProvider.processNews({
      text: content,
      systemPrompt: systemPrompt.prompt_text
    });

    // 3. Save to DB
    await prisma.processedContent.create({
      data: {
        source_id: source.id,
        original_url: source.url,
        title,
        category: processedData.category,
        scope_level: processedData.scope_level as any,
        political_bias: processedData.political_bias,
        summary_short: processedData.summary_short,
        summary_medium: processedData.summary_medium,
        summary_long: processedData.summary_long,
        is_realtime_alert: processedData.is_realtime_alert,
        tags: {
          create: processedData.tags.map(tag => ({ tag_name: tag }))
        }
      }
    });

    console.log(`Successfully processed content from ${source.name}`);
  } catch (error) {
    console.error(`Error processing job for source ${sourceId}:`, error);
  }
}, { connection });

export { scrapingQueue };
