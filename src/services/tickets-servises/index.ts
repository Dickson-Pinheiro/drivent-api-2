import enrollmentsService from '../enrollments-service';
import { TicketTypeEntity } from '@/protocols';
import ticketsRepository from '@/repositories/tickets-repository';
import { notFoundError } from '@/errors';

async function getAllTicketsType(): Promise<TicketTypeEntity[]> {
  try {
    const tickets = await ticketsRepository.getAllTicketsType();
    return tickets;
  } catch (error) {
    throw error;
  }
}

async function getTicketByUserId(id: number) {
  try {
    const enrollment = await enrollmentsService.getEnrollmentByUserId(id);
    if (!enrollment) throw notFoundError();

    const ticket = await ticketsRepository.getTicketByEnrollmentId(enrollment.id);
    if (!ticket) throw notFoundError();
    return ticket;
  } catch (error) {
    throw error;
  }
}

async function createTicket(userId: number, ticketTypeId: number) {
  try {
    const enrollment = await enrollmentsService.getEnrollmentByUserId(userId);
    if (!enrollment) throw notFoundError();

    const ticket = await ticketsRepository.createTicket(enrollment.id, ticketTypeId);
    return ticket;
  } catch (error) {
    throw error;
  }
}

const ticketsServices = {
  getAllTicketsType,
  createTicket,
  getTicketByUserId,
};

export default ticketsServices;
