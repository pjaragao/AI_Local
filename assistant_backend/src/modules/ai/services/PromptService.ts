import { prisma } from '../../../shared/infra/http/prisma';

interface ICreatePromptDTO {
  name: string;
  prompt_text: string;
  ai_provider: string;
  ai_model: string;
  temperature?: number;
}

class PromptService {
  public async create({ name, prompt_text, ai_provider, ai_model, temperature }: ICreatePromptDTO) {
    const prompt = await prisma.systemPrompt.create({
      data: {
        name,
        prompt_text,
        ai_provider,
        ai_model,
        temperature
      }
    });

    return prompt;
  }

  public async update(id: string, data: Partial<ICreatePromptDTO>) {
    const prompt = await prisma.systemPrompt.update({
      where: { id },
      data
    });

    return prompt;
  }

  public async list() {
    return prisma.systemPrompt.findMany();
  }

  public async findByName(name: string) {
    return prisma.systemPrompt.findUnique({
      where: { name }
    });
  }
}

export { PromptService };
