import Router from 'express';
import { googleCallback, loginUser, redirectToGoogle, registerUser } from './auth.controller.js';
import { validate } from '../../middleware/validate.js';
import { validateLogin, validateRegister } from './auth.schema.js';
const router = Router();

router.post('/register', validate(validateRegister), registerUser);
router.post('/login', validate(validateLogin), loginUser);
router.get('/google', redirectToGoogle );
router.get("/google/callback", googleCallback);


export default router;
