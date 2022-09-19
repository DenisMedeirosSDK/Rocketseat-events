import 'dotenv/config';
import 'express-async-errors';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { routes } from './routes';

export const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use(routes);

app.get('/', (req: Request, res: Response) => {
  console.log('Hello world');

  return res.send('Hello world');
});

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof Error) {
    return response.status(400).json({
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'Error',
    message: 'Internal server error',
  });
});
