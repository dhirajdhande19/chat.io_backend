import express from 'express';
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Cors
import cors from 'cors';
app.use(
  cors({
    origin: ['http://localhost:5173'], // add depoyed fronted url later
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// routes
import userRoutes from './modules/user/user.routes.js';
import chatRoutes from './modules/chat/chat.routes.js';

app.use('/api/users', userRoutes);
app.use('/api/chats', chatRoutes);

export default app;
