import cors from 'cors';
import 'dotenv/config';
import express, { Request, Response } from 'express';
import { routes } from './routes';
const PORT = process.env.PORT || 3000;

const app = express();
app.use(
  cors({
    origin: '*',
  })
);
app.use(express.json());

app.get('/', (request: Request, response: Response) => {
  return response.end('hello world');
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
