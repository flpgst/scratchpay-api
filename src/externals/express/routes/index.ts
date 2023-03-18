import { Express, Router } from 'express';
import { OK } from 'http-status';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';

const createRouter = (app: Express) => {
  const router = Router();

  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(cors());
  app.use(helmet());

  router.use('/ping', (_req, res) => {
    return res.status(OK).send('pong');
  });

  router.use('/api', [routes]);

  return router;
};

export default createRouter;
