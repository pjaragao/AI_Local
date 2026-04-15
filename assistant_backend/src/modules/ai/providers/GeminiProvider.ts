import axios from 'axios';
import { IAIProvider, IProcessNewsDTO, IAIProviderResponse } from './IAIProvider';

class GeminiProvider implements IAIProvider {
  private client: any;

  constructor() {
    // Inicialização da API do Gemini via axios ou SDK
  }

  public async processNews({ text, systemPrompt }: IProcessNewsDTO): Promise<IAIProviderResponse> {
    const apiKey = process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const payload = {
      contents: [{
        parts: [{
          text: `${systemPrompt}\n\nTexto para análise:\n${text}`
        }]
      }],
      generationConfig: {
        responseMimeType: "application/json",
      }
    };

    try {
      const response = await axios.post(url, payload);
      const content = response.data.candidates[0].content.parts[0].text;
      return JSON.parse(content) as IAIProviderResponse;
    } catch (error) {
      console.error('Error in GeminiProvider:', error);
      throw new Error('Failed to process news with Gemini');
    }
  }
}

export { GeminiProvider };
