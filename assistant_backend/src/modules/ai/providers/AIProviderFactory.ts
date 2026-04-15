import { GeminiProvider } from './GeminiProvider';
import { OllamaProvider } from './OllamaProvider';
import { IAIProvider } from './IAIProvider';

type ProviderName = 'gemini' | 'ollama' | 'openai';

class AIProviderFactory {
  public static getProvider(name: ProviderName): IAIProvider {
    switch (name) {
      case 'gemini':
        return new GeminiProvider();
      case 'ollama':
        return new OllamaProvider();
      // case 'openai':
      //   return new OpenAIProvider();
      default:
        throw new Error('AI Provider not found');
    }
  }
}

export { AIProviderFactory };
