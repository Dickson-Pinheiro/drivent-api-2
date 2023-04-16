import { Router } from 'express';
import { getPayment, processPayment } from '@/controllers';
import { authenticateToken } from '@/middlewares';

const paymentsRouter = Router();

paymentsRouter.all('/*', authenticateToken).get('/', getPayment).post('/process', processPayment);

export { paymentsRouter };
