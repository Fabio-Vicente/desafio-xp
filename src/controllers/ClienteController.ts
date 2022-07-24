import { UnauthorizedError } from 'restify-errors';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ClienteService } from '../services';

const { OK } = StatusCodes;

export default class ClienteController {
  private service: ClienteService;

  constructor(service: ClienteService = new ClienteService()) {
    this.service = service;
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { token, error } = await this.service.login(req.body);

    if (error) {
      return next(new UnauthorizedError('Não foi possível efetuar o login. Verifique os dados informados'));
    }

    res.status(OK).json({ token });
  }
}
