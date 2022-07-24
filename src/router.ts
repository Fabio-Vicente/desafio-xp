import { Router } from 'express';
import { ClienteController } from './controllers';

const router = Router();

const { login, validator } = new ClienteController();
const { verifyLogin } = validator;

router
  .route('/login')
  .post(verifyLogin, login);

export default router;
