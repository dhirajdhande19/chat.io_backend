import mongoose from 'mongoose';
import { MONGO_URL } from './env.js';

export const connectToDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('Connected to DB');
  } catch (err) {
    console.error(`Error while connecting to DB: ${err.message}`);
  }
};
