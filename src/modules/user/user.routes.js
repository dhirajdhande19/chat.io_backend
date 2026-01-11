import Router from 'express';
import { getAllUsers, getUserInfo } from './user.controller.js';
const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getUserInfo);

export default router;
