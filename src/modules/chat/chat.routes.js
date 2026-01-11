import Router from 'express';
import { getPrevChats } from './chat.controller.js';
import authMiddleware from '../../middleware/authMiddleware.js';
const router = Router();

router.get('/:reciverId', authMiddleware, getPrevChats);

export default router;
