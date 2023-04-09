import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../../swagger_output.json';
import { createRouter } from './routes';

export const app = express();

app.use(createRouter(app));

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
