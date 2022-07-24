import 'express-async-errors';
import express from 'express';
import router from './router';
import { ErrorMiddleware } from './middlewares';

const app = express();

app.use(express.json());

app.use(router);

app.use(ErrorMiddleware.error);

export default app;
