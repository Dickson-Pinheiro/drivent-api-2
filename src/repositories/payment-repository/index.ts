import { prisma } from '@/config';

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

const paymentRepository = {
  getPayment,
};

export default paymentRepository;
