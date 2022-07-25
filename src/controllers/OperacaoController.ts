import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { OperacaoValidator } from '../middlewares';
import { OperacaoService } from '../services';

const { CREATED, GONE } = StatusCodes;

export default class {
  private service;

  public operacaoValidator;

  constructor(
    service: OperacaoService = new OperacaoService(),
    validator: OperacaoValidator = new OperacaoValidator(),
  ) {
    this.service = service;
    this.operacaoValidator = validator;
    this.comprarAtivo = this.comprarAtivo.bind(this);
  }

  async comprarAtivo(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id, error } = await this.service.comprarAtivo(req.body);

    if (error) {
      next({ statusCode: GONE, message: 'Não há ativos suficientes para compra' });
    }

    res.status(CREATED).json({ id });
  }
}
