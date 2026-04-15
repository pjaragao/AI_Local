import axios from 'axios';
import * as cheerio from 'cheerio';

interface IScrapeRequestDTO {
  url: string;
  config: {
    titleSelector: string;
    contentSelector: string;
  };
}

interface IScrapeResponseDTO {
  title: string;
  content: string;
}

class ScraperService {
  public async execute({ url, config }: IScrapeRequestDTO): Promise<IScrapeResponseDTO> {
    try {
      const { data: html } = await axios.get(url);
      const $ = cheerio.load(html);

      const title = $(config.titleSelector).text().trim();
      const content = $(config.contentSelector).text().trim();

      if (!title || !content) {
        throw new Error('Could not extract title or content from source');
      }

      return {
        title,
        content
      };
    } catch (error) {
      console.error('Error scraping URL:', url, error);
      throw new Error('Failed to scrape content');
    }
  }
}

export { ScraperService };
