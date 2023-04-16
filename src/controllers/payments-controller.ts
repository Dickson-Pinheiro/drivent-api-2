import { Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import paymentServices from '@/services/payment-service';

export async function getPayment(req: AuthenticatedRequest, res: Response) {
  const { ticketId } = req.query;
  const { userId } = req;

  if (!ticketId) {
    res.status(400).send();
  }

  if (isNaN(Number(ticketId))) {
    return res.status(400).send();
  }

  const ticketIdParse = Number(ticketId);

  try {
    const paymentData = await paymentServices.getPayment(ticketIdParse, userId);
    return res.send(paymentData);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.status(404).send();
    }
    if (error.name === 'UnauthorizedError') {
      return res.status(401).send();
    }
    return res.status(500).send();
  }
}
