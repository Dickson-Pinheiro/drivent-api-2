import { prisma } from '@/config';
import { TicketTypeEntity } from '@/protocols';

async function getAllTicketsType(): Promise<TicketTypeEntity[]> {
  try {
    const tickets = await prisma.ticketType.findMany();
    return tickets;
  } catch (error) {
    throw error;
  }
}

async function createTicket(enrollmentId: number, ticketTypeId: number) {
  try {
    const ticket = await prisma.ticket.create({
      data: {
        status: 'RESERVED',
        enrollmentId,
        ticketTypeId,
      },
      select: {
        id: true,
        status: true,
        ticketTypeId: true,
        enrollmentId: true,
        TicketType: {
          select: {
            id: true,
            name: true,
            price: true,
            isRemote: true,
            includesHotel: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
    return ticket;
  } catch (error) {
    throw { name: 'internalServerError' };
  }
}

async function getTicketByEnrollmentId(enrollmentId: number) {
  try {
    const ticket = await prisma.ticket.findFirst({
      where: {
        enrollmentId,
      },
      select: {
        id: true,
        status: true,
        ticketTypeId: true,
        enrollmentId: true,
        TicketType: {
          select: {
            id: true,
            name: true,
            price: true,
            isRemote: true,
            includesHotel: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
    return ticket;
  } catch (error) {
    throw { name: 'internalServerError' };
  }
}

async function getTicketById(id: number) {
  try {
    const ticket = await prisma.ticket.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        status: true,
        ticketTypeId: true,
        enrollmentId: true,
        TicketType: {
          select: {
            id: true,
            name: true,
            price: true,
            isRemote: true,
            includesHotel: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
    return ticket;
  } catch (error) {
    throw { name: 'internalServerError' };
  }
}

async function updateTicketStatus(ticketId: number) {
  await prisma.ticket.update({
    data: {
      status: 'PAID',
    },
    where: {
      id: ticketId,
    },
  });
}

const ticketsRepository = {
  getAllTicketsType,
  createTicket,
  getTicketByEnrollmentId,
  getTicketById,
  updateTicketStatus,
};

export default ticketsRepository;
