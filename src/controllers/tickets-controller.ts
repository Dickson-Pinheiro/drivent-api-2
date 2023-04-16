import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import ticketsServices from '@/services/tickets-servises';

export async function getTicketsTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const tickets = await ticketsServices.getAllTicketsType();
    res.send(tickets);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
  }
}

export async function createTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketTypeId } = req.body;
  try {
    const ticket = await ticketsServices.createTicket(userId, ticketTypeId);
    return res.status(httpStatus.CREATED).send(ticket);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.status(404).send();
    }
    return res.status(500).send();
  }
}

export async function getTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const ticket = await ticketsServices.getTicketByUserId(userId);
    return res.send(ticket);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.status(404).send();
    }
    return res.status(500).send();
  }
}
