import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import ValidationTypes from '../types/ValidationTypes';
import { ExpectedError } from '../interfaces';

const { BAD_REQUEST, LENGTH_REQUIRED, UNPROCESSABLE_ENTITY } = StatusCodes;
const {
  FIELD_REQUIRED,
  NOT_NUMBER,
  NOT_STRING,
  SHORT_STRING,
} = ValidationTypes;

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
  senha:
    Joi.string()
      .required()
      .min(8)
      .error(([error]): Error => {
        const validation = new Error() as ExpectedError;
        switch (error.code) {
          case FIELD_REQUIRED:
            validation.message = 'Senha não informada';
            validation.statusCode = BAD_REQUEST;
            break;
          case NOT_STRING:
            validation.message = 'Formato de senha inválido';
            validation.statusCode = UNPROCESSABLE_ENTITY;
            break;
          case SHORT_STRING:
            validation.message = 'A senha deve ter mais de 8 caracteres';
            validation.statusCode = LENGTH_REQUIRED;
            break;
          default:
            return error;
        }
        return validation;
      }),
});
