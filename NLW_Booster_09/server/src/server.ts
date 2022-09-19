import Http from 'node:http';
import { app } from './app';

const processId = process.pid;
const PORT = process.env.PORT || 3000;

Http.createServer(app)
  .listen(PORT, () => console.log(`Server start in ${PORT}`))
  .once('listening', () => {
    console.log('Server started in process', processId);
  });
