import { NextFunction, Request, Response } from 'express';
import { ExpectedError } from '../interfaces';

export default class ErrorMiddleware {
  // eslint-disable-next-line no-unused-vars
  public static error(err: Error, req: Request, res: Response, _next: NextFunction): void {
    const { statusCode, message } = err as ExpectedError;
    res.status(statusCode || 500).json({ message });
  }
}
