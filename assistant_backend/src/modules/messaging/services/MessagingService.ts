import { prisma } from '../../../shared/infra/http/prisma';
import { OnboardingService } from '../../users/services/OnboardingService';

// No futuro, aqui usaria uma biblioteca real de WhatsApp/Telegram
// Por enquanto, apenas logamos as respostas
class MessagingService {
  private onboardingService: OnboardingService;

  constructor() {
    this.onboardingService = new OnboardingService();
  }

  public async handleInboundMessage(from: string, text: string, platform: 'whatsapp' | 'telegram') {
    const responseText = await this.onboardingService.handle(from, text);
    
    // Simulação de envio de resposta
    console.log(`[OUTBOUND - ${platform}] To: ${from} | Msg: ${responseText}`);
    
    return responseText;
  }
}

export { MessagingService };
