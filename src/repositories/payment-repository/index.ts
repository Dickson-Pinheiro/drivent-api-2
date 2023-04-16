import { prisma } from '@/config';
import { CreatePaymentData } from '@/protocols';

async function getPayment(ticketId: number) {
  try {
    const paymentData = await prisma.payment.findFirst({
      where: {
        ticketId,
      },
      select: {
        id: true,
        ticketId: true,
        value: true,
        cardIssuer: true,
        cardLastDigits: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return paymentData;
  } catch (error) {
    throw { name: 'internalServerError' };
  }
}

async function createPayment(paymentData: CreatePaymentData) {
  try {
    const payment = await prisma.payment.create({
      data: paymentData,
      select: {
        id: true,
        ticketId: true,
        value: true,
        cardIssuer: true,
        cardLastDigits: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return payment;
  } catch (error) {
    throw { name: 'internalServerError' };
  }
}

const paymentRepository = {
  getPayment,
  createPayment,
};

export default paymentRepository;
