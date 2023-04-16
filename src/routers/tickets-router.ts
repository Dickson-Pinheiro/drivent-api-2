import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getTicketsTypes, createTicket, getTicket } from '@/controllers';
import { ticketSchema } from '@/schemas';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .get('/types', getTicketsTypes)
  .post('/', validateBody(ticketSchema), createTicket)
  .get('/', getTicket);

export { ticketsRouter };
