import express, { Request, Response, ErrorRequestHandler } from 'express';
import dotenv from 'dotenv';

import router from './src/router';

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use('/', router);

app.use((err: ErrorRequestHandler, _req: Request, res: Response) => {
  console.error(err);

  res.status(500).json({
    status: 'fail',
    message: 'Something went wrong',
  });
});

app.all('*', (_req, res) => {
  res.status(404).send({ message: 'Path not found!' });
});

app
  .listen(PORT, () => {
    console.log('Server running at PORT: ', PORT);
  })
  .on('error', error => {
    throw new Error(error.message);
  });
