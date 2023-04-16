import ticketsServices from '../tickets-servises';
import enrollmentsService from '../enrollments-service';
import { unauthorizedError } from '@/errors';
import paymentRepository from '@/repositories/payment-repository';
import { BodyPayment, CreatePaymentData } from '@/protocols';

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

async function processPayment(paymentData: BodyPayment, userId: number) {
  try {
    const enrollment = await enrollmentsService.getEnrollmentByUserId(userId);
    const ticketUser = await ticketsServices.getTicketByEnrollmentId(enrollment.id);
    const ticket = await ticketsServices.getTicketById(paymentData.ticketId);

    if (!ticketUser) {
      throw unauthorizedError();
    }

    if (ticket.id !== ticketUser.id) {
      throw unauthorizedError();
    }

    const createBody = {
      ticketId: ticket.id,
      value: ticket.TicketType.price,
      cardIssuer: paymentData.cardData.issuer,
      cardLastDigits: paymentData.cardData.number.toString().slice(-4),
    } as CreatePaymentData;

    const paymentResponse = await paymentRepository.createPayment(createBody);
    await ticketsServices.updateTicketStatus(ticket.id);
    return paymentResponse;
  } catch (error) {
    throw error;
  }
}

const paymentServices = {
  getPayment,
  processPayment,
};

export default paymentServices;
