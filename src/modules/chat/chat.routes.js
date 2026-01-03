import Router from 'express';
import { getPrevChats } from './chat.controller.js';
const router = Router();

router.get('/:reciverId', getPrevChats);

export default router;
