import { User } from '../user/user.schema.js';
import { JWT_EXPRIRES_IN, JWT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_REDIRECT_URI, GOOGLE_CLIENT_SECRET } from '../../config/env.js';
import bcrypt from 'bcrypt';
import axios from "axios";
import jwt from 'jsonwebtoken';

export const createNewUser = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10); // hash password
  const user = await User.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    imageUrl: data.imageUrl ? data.imageUrl : '',
  });

  return user;
};


export const googleAuth = async(code) => {
    const response = await axios.post(
    "https://oauth2.googleapis.com/token",
    new URLSearchParams({
      code,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code",
    }),
    { headers:{"content-Type" : "application/x-www-form-urlencoded"}}
  );
  const {id_token} = response.data;
  const googleUser = jwt.decode(id_token);
  const {name,email,picture} = googleUser;

  const user = await User.findOne({email});

  if(!user){
    await User.create({
      name,
      email,
      imageUrl: picture,
      isGoogleUser: true
    })
  }

  const token = jwt.sign(
    { name: name, email: email}, // payload
    JWT_SECRET, // secret
    { expiresIn: JWT_EXPRIRES_IN } // expire
  );

  return token;
}