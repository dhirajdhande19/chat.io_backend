import express from 'express';
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Cors
import cors from 'cors';
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://chat-io-frontend.vercel.app'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// routes
import userRoutes from './modules/user/user.routes.js';
import chatRoutes from './modules/chat/chat.routes.js';
import authRoutes from './modules/auth/auth.routes.js';

app.use('/api/users', userRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/auth', authRoutes);

app.get('/ping', (req, res) => {
  return res.status(200).json({ status: 'ok' });
});

export default app;
