import express from 'express';
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
import userRoutes from './modules/user/user.routes.js';

app.use('/api/users', userRoutes);

export default app;
