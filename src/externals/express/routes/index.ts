import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import { Express, Router } from 'express';
import helmet from 'helmet';
import { OK } from 'http-status';
import { routes as clinicRoutes } from './clinics';

export const createRouter = (app: Express) => {
  const router = Router();

  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(cors());
  app.use(helmet());

  router.use('/ping', (req, res) => {
    return res.status(OK).send('pong');
  });

  router.use('/api', [clinicRoutes]);

  return router;
};
