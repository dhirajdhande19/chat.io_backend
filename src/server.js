import app from './app.js';
import { createServer } from 'node:http';
import { connectToDB } from './config/db.js';
import { PORT } from './config/env.js';
import { connectToSocket } from './modules/socket/socket.controller.js';

import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const server = createServer(app);
// establish socket connection
// connectToSocket(server);

// const __dirname = dirname(fileURLToPath(import.meta.url));

// app.get('/', (req, res) => {
//   res.sendFile(join(__dirname, 'index.html'));
// });

server.listen(PORT, () => {
  connectToDB();
  console.log(`Running on: ${PORT}`);
});
