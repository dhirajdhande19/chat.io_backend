import wrapAsync from '../../middleware/wrapAsync.js';
import { createNewUser } from './auth.service.js';
import { User } from '../user/user.schema.js';
import jwt from 'jsonwebtoken';
import { JWT_EXPRIRES_IN, JWT_SECRET } from '../../config/env.js';
import bcrypt from 'bcrypt';

export const registerUser = wrapAsync(async (req, res) => {
  const { name, email, password, imageUrl } = req.body;
  const data = { name, email, password, imageUrl };
  const user = await createNewUser(data);
  return res.json(user);
});

export const loginUser = wrapAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.json({ message: 'Email is invalid' });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.json({ message: 'Password is invalid' });
  }
  const token = jwt.sign(
    { name: user.name, email: user.email }, // payload
    JWT_SECRET, // secret
    { expiresIn: JWT_EXPRIRES_IN } // expire
  );

  return res.json(token);
});
