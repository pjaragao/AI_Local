import { Router } from 'express';
// import telegramRouter from './telegram.routes';
// import whatsappRouter from './whatsapp.routes';

const webhookRouter = Router();

webhookRouter.post('/telegram', (req, res) => {
  const { message } = req.body;
  console.log('Telegram message received:', message);
  
  // Aqui entrará a lógica da State Machine de Onboarding
  
  return res.status(200).send();
});

webhookRouter.post('/whatsapp', (req, res) => {
  const { entry } = req.body;
  console.log('WhatsApp message received:', entry);
  
  return res.status(200).send();
});

export default webhookRouter;
