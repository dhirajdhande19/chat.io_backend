import { JWT_SECRET } from '../config/env.js';
import jwt from 'jsonwebtoken';

export const socketAuthMiddleware = (socket, next) => {
  try {
    // console.log('socketAuthMiddleware init');
    const token = socket.handshake.auth.token;
    if (!token) {
      return console.log({ error: 'No token' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    socket.user = decoded;
    next();
  } catch (err) {
    console.log({ error: err.message });
    next();
  }
};
