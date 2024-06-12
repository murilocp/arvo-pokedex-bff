import express, { Request, Response, ErrorRequestHandler } from 'express';
import dotenv from 'dotenv';

import router from './src/router';

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use('/', router);

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
