import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { LoginValidator } from '../middlewares';
import { ClienteService } from '../services';

const { OK, UNAUTHORIZED } = StatusCodes;

export default class ClienteController {
  private service;

  public loginValidator;

  constructor(
    service: ClienteService = new ClienteService(),
    validator: LoginValidator = new LoginValidator(),
  ) {
    this.service = service;
    this.loginValidator = validator;
    this.login = this.login.bind(this);
  }

  public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { token, error } = await this.service.login(req.body);

    if (error) {
      return next({ statusCode: UNAUTHORIZED, message: 'Não foi possível efetuar o login. Verifique os dados informados' });
    }

    res.status(OK).json({ token });
  }
}
