import './bootstrap';
import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port = process.env.SERVER_PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, this is Express + TypeScript');
});

app.listen(port, () => {
  console.log(`[Server]: I am running at https://localhost:${port}`);
});
