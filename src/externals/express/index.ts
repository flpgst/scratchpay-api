import express from 'express';
import createRouter from './routes';

const app = express();

app.use(createRouter(app));

export default app;
