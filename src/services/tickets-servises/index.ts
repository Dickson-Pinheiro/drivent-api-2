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

async function getTicketById(id: number) {
  try {
    const ticket = await ticketsRepository.getTicketById(id);
    if (!ticket) {
      throw notFoundError();
    }
    return ticket;
  } catch (error) {
    throw error;
  }
}

async function getTicketByUserId(id: number) {
  try {
    const enrollment = await enrollmentsService.getEnrollmentByUserId(id);
    if (!enrollment) throw notFoundError();

    const ticket = await getTicketByEnrollmentId(enrollment.id);
    if (!ticket) throw notFoundError();
    return ticket;
  } catch (error) {
    throw error;
  }
}

async function getTicketByEnrollmentId(enrollmentId: number) {
  return await ticketsRepository.getTicketByEnrollmentId(enrollmentId);
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
  getTicketByEnrollmentId,
  getTicketById,
};

export default ticketsServices;
