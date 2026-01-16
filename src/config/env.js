import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT;
export const MONGO_URL = process.env.MONGO_URL;
// jwt
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPRIRES_IN = process.env.JWT_EXPRIRES_IN;

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

export const FRONTEND_URL = process.env.FRONTEND_URL;
