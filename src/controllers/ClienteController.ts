import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ClienteValidation from '../middlewares';
import { ClienteService } from '../services';

const { OK, UNAUTHORIZED } = StatusCodes;

export default class ClienteController {
  private service;

  public validator;

  constructor(
    service: ClienteService = new ClienteService(),
    validator: ClienteValidation = new ClienteValidation(),
  ) {
    this.service = service;
    this.validator = validator;
    this.login = this.login.bind(this);
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { token, error } = await this.service.login(req.body);

    if (error) {
      return next({ statusCode: UNAUTHORIZED, message: 'Não foi possível efetuar o login. Verifique os dados informados' });
    }

    res.status(OK).json({ token });
  }
}
