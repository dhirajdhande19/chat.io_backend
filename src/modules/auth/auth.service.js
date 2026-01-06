import { User } from '../user/user.schema.js';
import bcrypt from 'bcrypt';

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
