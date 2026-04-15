import axios from 'axios';
import { IAIProvider, IProcessNewsDTO, IAIProviderResponse } from './IAIProvider';

class OllamaProvider implements IAIProvider {
  public async processNews({ text, systemPrompt }: IProcessNewsDTO): Promise<IAIProviderResponse> {
    const baseUrl = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
    
    try {
      const response = await axios.post(`${baseUrl}/api/generate`, {
        model: "llama3", // Ou outro modelo local configurado
        prompt: `${systemPrompt}\n\nTexto:\n${text}`,
        stream: false,
        format: "json"
      });

      return JSON.parse(response.data.response) as IAIProviderResponse;
    } catch (error) {
      console.error('Error in OllamaProvider:', error);
      throw new Error('Failed to process news with Ollama');
    }
  }
}

export { OllamaProvider };
