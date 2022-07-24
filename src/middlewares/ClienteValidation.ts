import { NextFunction, Request, Response } from 'express';
import { Schema } from 'joi';
import loginSchema from '../schemas/loginSchema';

export default class {
  private schema;

  constructor(schema: Schema = loginSchema) {
    this.schema = schema;
  }

  public verifyLogin(req: Request, _res: Response, next: NextFunction): void {
    const { error } = this.schema.validate(req.body);

    if (error) {
      return next(error);
    }

    next();
  }
}
