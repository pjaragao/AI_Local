import { Router } from 'express';
import webhookRouter from './webhooks.routes';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'Assistant AI Backend API' });
});

routes.use('/webhooks', webhookRouter);
// routes.use('/users', userRouter);

export default routes;
