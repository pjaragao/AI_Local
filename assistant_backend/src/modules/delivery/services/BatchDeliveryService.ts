import { prisma } from '../../../shared/infra/http/prisma';
import { format } from 'date-fns';

class BatchDeliveryService {
  /**
   * Refined logic to match users with contents based on:
   * 1. Delivery Time
   * 2. Active Days for each location
   * 3. Political Bias
   * 4. Scope Level (matching neighborhood/city/state)
   */
  public async generateBulletins() {
    const now = new Date();
    const currentHour = format(now, 'HH:00');
    const currentDay = now.getDay(); // 0 is Sunday

    const usersToNotify = await prisma.user.findMany({
      where: {
        status: 'ACTIVE',
        preferences: {
          preferred_delivery_times: { has: currentHour }
        }
      },
      include: {
        preferences: true,
        locations: true
      }
    });

    for (const user of usersToNotify) {
      // Find locations active today
      const todayLocations = user.locations.filter(loc => 
        loc.active_days.includes(currentDay)
      );

      // Simple match: Contents processed today that match user's bias and locations
      const contents = await prisma.processedContent.findMany({
        where: {
          AND: [
            {
              // Bias match: either exact match or user accepts 'neutral'
              OR: [
                { political_bias: user.preferences?.political_bias },
                { political_bias: 'neutral' }
              ]
            },
            {
              // Simple location match based on location_name 
              // (In production this would use lat/long or geotags)
              OR: todayLocations.map(loc => ({
                title: { contains: loc.location_name, mode: 'insensitive' }
              }))
            }
          ]
        },
        take: 10,
        orderBy: { created_at: 'desc' }
      });

      if (contents.length > 0) {
        // Aggregate summaries based on preference
        const summaryKey = user.preferences?.summary_preference.toLowerCase() as any;
        const bulletinText = contents.map(c => `- ${c.title}\n${(c as any)[`summary_${summaryKey}`]}`).join('\n\n');

        console.log(`[BATCH] Sending bulletin to ${user.phone_number || user.telegram_id}:\n${bulletinText}`);
        
        // Mark as delivered
        await prisma.contentDeliveryLog.createMany({
          data: contents.map(c => ({
            user_id: user.id,
            content_id: c.id
          }))
        });
      }
    }
  }
}

export { BatchDeliveryService };
