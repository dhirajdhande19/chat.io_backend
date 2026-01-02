import express from 'express';
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
import userRoutes from './modules/user/user.routes.js';
import chatRoutes from './modules/chat/chat.routes.js';

app.use('/api/users', userRoutes);
app.use('/api/chats', chatRoutes);

export default app;
