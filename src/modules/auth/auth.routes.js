import Router from 'express';
import { loginUser, registerUser } from './auth.controller.js';
import { validate } from '../../middleware/validate.js';
import { validateLogin, validateRegister } from './auth.schema.js';
const router = Router();

router.post('/register', validate(validateRegister), registerUser);
router.post('/login', validate(validateLogin), loginUser);

export default router;
