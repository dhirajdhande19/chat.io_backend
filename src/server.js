import app from './app.js';
import { createServer } from 'node:http';
import { connectToDB } from './config/db.js';
import { PORT } from './config/env.js';

const server = createServer(app);

server.listen(PORT, () => {
  connectToDB();
  console.log(`Running on: ${PORT}`);
});
