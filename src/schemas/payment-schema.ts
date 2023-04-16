import joiBase from 'joi';
import joiDate from '@joi/date';

const joi = joiBase.extend(joiDate);

export const paymentSchema = joi.object({
  ticketId: joi.number().required(),
  cardData: joi.object({
    issuer: joi.string().required(),
    number: joi.number().required(),
    name: joi.string().required(),
    expirationDate: joi.date().format('MM/YY').required(),
    cvv: joi.number().integer().required(),
  }),
});
