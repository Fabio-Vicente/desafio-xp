import { NextFunction, Request, Response } from 'express';
import { Schema } from 'joi';
import { StatusCodes } from 'http-status-codes';
import Auth from '../Auth';
import loginSchema from '../schemas/loginSchema';

const { UNAUTHORIZED } = StatusCodes;

export default class {
  private schema;

  constructor(schema: Schema = loginSchema) {
    this.schema = schema;
    this.verifyLogin = this.verifyLogin.bind(this);
  }

  public verifyLogin(req: Request, _res: Response, next: NextFunction): void {
    const { error } = this.schema.validate(req.body);

    if (error) {
      return next(error);
    }

    next();
  }

  public static authenticate(req: Request, _res:Response, next: NextFunction): void {
    const user = Auth.verifyToken(req.headers.authorization as string);

    if (!user) {
      return next({ statusCode: UNAUTHORIZED, message: 'Este usuário não tem permissão para fazer essa operação' });
    }

    req.headers.codCliente = user.codCliente;
    req.headers.funcao = user.funcao;

    next();
  }
}
