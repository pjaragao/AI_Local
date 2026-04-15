import { prisma } from '../../../shared/infra/http/prisma';

export enum OnboardingState {
  START = 'START',
  ASK_NAME = 'ASK_NAME',
  ASK_CITY = 'ASK_CITY',
  ASK_NEIGHBORHOOD = 'ASK_NEIGHBORHOOD',
  ASK_BIAS = 'ASK_BIAS',
  COMPLETED = 'COMPLETED'
}

class OnboardingService {
  public async handle(userId: string, message: string) {
    // Busca o usuário ou cria se não existir (ID do Telegram ou WhatsApp)
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          { telegram_id: userId },
          { phone_number: userId }
        ]
      },
      include: { preferences: true }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          telegram_id: userId.includes('@') ? null : userId,
          phone_number: userId.includes('+') ? userId : null,
          status: 'ACTIVE',
        }
      });
    }

    // Lógica simplificada de State Machine usando o campo name ou uma tabela de states
    // Para simplificar, vamos usar o campo 'name' como gatilho de onboarding inicial
    if (!user.name) {
      if (message.toLowerCase() === 'oi' || message.toLowerCase() === 'olá') {
          return "Olá! Bem-vindo ao seu assistente de IA. Qual o seu nome?";
      }
      
      await prisma.user.update({
          where: { id: user.id },
          data: { name: message }
      });
      
      return `Prazer, ${message}! Agora, me diga: em qual cidade você mora?`;
    }

    // ... Continuação da lógica de onboarding para capturar cidade, viés, etc.
    
    return "Entendi! Estou configurando seu radar personalizado.";
  }
}

export { OnboardingService };
