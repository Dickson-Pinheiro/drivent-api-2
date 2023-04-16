import { Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import paymentServices from '@/services/payment-service';
import { BodyPayment } from '@/protocols';

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

export async function processPayment(req: AuthenticatedRequest, res: Response) {
  const paymentData: BodyPayment = req.body;
  const { userId } = req;
  if (!paymentData.ticketId) {
    res.status(400).send();
  }
  if (!paymentData.cardData) {
    res.status(400).send();
  }
  try {
    const payment = await paymentServices.processPayment(paymentData, userId);
    return res.send(payment);
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
