import wrapAsync from '../../middleware/wrapAsync.js';
import { createNewUser, googleAuth } from './auth.service.js';
import { User } from '../user/user.schema.js';
import jwt from 'jsonwebtoken';
import {
  JWT_EXPRIRES_IN,
  JWT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_REDIRECT_URI,
} from '../../config/env.js';
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
    return res.status(401).json({ message: 'Email is invalid' });
  }
  if (!user.password && user.isGoogleUser) {
    return res
      .status(401)
      .json({ message: 'You need to log in via Google OAuth' });
  }

  /*
    Note: even if js(auto-suggest) tell u to remove await saying {'await' has no effect on the type of this expression.} 
    do NOT listen to that or else u'll get token even when the password is wrong(i.e. serious security issue)
  */
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(401).json({ message: 'Password is invalid' });
  }
  const token = jwt.sign(
    { name: user.name, email: user.email, _id: user._id }, // payload
    JWT_SECRET, // secret
    { expiresIn: JWT_EXPRIRES_IN } // expire
  );

  return res.json(token);
});

export const redirectToGoogle = wrapAsync(async (req, res) => {
  const redirectUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=openid%20email%20profile&access_type=offline&include_granted_scopes=true&state=xyz123&prompt=consent`;
  res.redirect(redirectUrl);
});

export const googleCallback = wrapAsync(async (req, res) => {
  const { code } = req.query;

  const token = await googleAuth(code);
  // temp
  res.json({ token: token });
  // res.redirect("/frontend") -> when deployed
});
