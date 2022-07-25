import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import ValidationTypes from '../types/ValidationTypes';
import { ExpectedError } from '../interfaces';

const { BAD_REQUEST, UNPROCESSABLE_ENTITY } = StatusCodes;
const { FIELD_REQUIRED, NOT_NUMBER, NOT_STRING } = ValidationTypes;

export default Joi.object({
  codCliente:
    Joi.number()
      .required()
      .error(([error]): Error => {
        const validation = new Error() as ExpectedError;
        switch (error.code) {
          case FIELD_REQUIRED:
            validation.message = 'Cliente não informado';
            validation.statusCode = BAD_REQUEST;
            break;
          case NOT_NUMBER:
            validation.message = 'Formato de cliente inválido';
            validation.statusCode = UNPROCESSABLE_ENTITY;
            break;
          default:
            return error;
        }
        return validation;
      }),
  codAtivo:
    Joi.string()
      .required()
      .error(([error]): Error => {
        const validation = new Error() as ExpectedError;
        switch (error.code) {
          case FIELD_REQUIRED:
            validation.message = 'Ativo não informado';
            validation.statusCode = BAD_REQUEST;
            break;
          case NOT_STRING:
            validation.message = 'Formato de ativo inválido';
            validation.statusCode = UNPROCESSABLE_ENTITY;
            break;
          default:
            return error;
        }
        return validation;
      }),
  qtdeAtivo:
    Joi.number()
      .required()
      .error(([error]): Error => {
        const validation = new Error() as ExpectedError;
        switch (error.code) {
          case FIELD_REQUIRED:
            validation.message = 'Quantidade de ativo não informada';
            validation.statusCode = BAD_REQUEST;
            break;
          case NOT_NUMBER:
            validation.message = 'Quantidade de ativo inválida';
            validation.statusCode = UNPROCESSABLE_ENTITY;
            break;
          default:
            return error;
        }
        return validation;
      }),
});
