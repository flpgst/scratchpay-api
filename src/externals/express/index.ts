import express from 'express';
import createRouter from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '@/swagger_output.json';

const app = express();

app.use(createRouter(app));

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

export default app;
