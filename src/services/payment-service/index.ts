import ticketsServices from '../tickets-servises';
import enrollmentsService from '../enrollments-service';
import { notFoundError, unauthorizedError } from '@/errors';
import paymentRepository from '@/repositories/payment-repository';

async function getPayment(ticketId: number, userId: number) {
  try {
    const enrollment = await enrollmentsService.getEnrollmentByUserId(userId);
    const ticketUser = await ticketsServices.getTicketByEnrollmentId(enrollment.id);
    const ticket = await ticketsServices.getTicketById(ticketId);
    if (!ticketUser) {
      throw unauthorizedError();
    }
    if (ticketUser.id !== ticket.id) {
      throw unauthorizedError();
    }

    const paymentData = await paymentRepository.getPayment(ticketId);
    return paymentData;
  } catch (error) {
    throw error;
  }
}

const paymentServices = {
  getPayment,
};

export default paymentServices;
