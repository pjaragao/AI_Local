import { prisma } from '../../../shared/infra/http/prisma';

interface ICreateCampaignDTO {
  name: string;
  objective: string;
  target_audience: any;
  message_template: string;
}

class MarketingService {
  /**
   * Dispara campanhas de Inbound para engajar usuários gratuitos
   * e abrir a janela de conversão orgânica (WhatsApp).
   */
  public async triggerAcquisitionCampaign(campaignId: string) {
    const campaign = await prisma.marketingCampaign.findUnique({
      where: { id: campaignId }
    });

    if (!campaign || campaign.status !== 'active') return;

    // Lógica para buscar usuários baseada no target_audience (ex: plano FREE e inativo há 2 dias)
    const targetUsers = await prisma.user.findMany({
      where: {
        plan_type: 'FREE',
        // Outros filtros do target_audience JSON...
      }
    });

    for (const user of targetUsers) {
      console.log(`[MARKETING] Sending engagement trigger to ${user.phone_number}: "${campaign.message_template}"`);
      // Aqui integraria com a API oficial de Templates do WhatsApp
    }
  }
}

export { MarketingService };
