import { Router } from 'express';
import { ClienteController, OperacaoController } from './controllers';
import { LoginValidator } from './middlewares';

const router = Router();

const { login, loginValidator } = new ClienteController();
const { comprarAtivo, operacaoValidator } = new OperacaoController();

const { verifyLogin } = loginValidator;
const { verifyOperacao } = operacaoValidator;

const { authenticate } = LoginValidator;

router
  .route('/login')
  .post(verifyLogin, login);

router
  .route('/investimento/comprar')
  .post(authenticate, verifyOperacao, comprarAtivo);

export default router;
