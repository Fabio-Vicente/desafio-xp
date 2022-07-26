import { NextFunction, Request, Response } from 'express';
import { Schema } from 'joi';
import operacaoSchema from '../schemas/operacaoSchema';

export default class OperacaoValidator {
  private schema;

  constructor(schema: Schema = operacaoSchema) {
    this.schema = schema;
    this.verifyOperacao = this.verifyOperacao.bind(this);
  }

  public verifyOperacao(req: Request, _res: Response, next: NextFunction): void {
    const { error } = this.schema.validate(req.body);

    if (error) {
      return next(error);
    }

    next();
  }
}
