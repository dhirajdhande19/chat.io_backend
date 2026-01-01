import { User } from './user.schema.js';

export const fetchAllUsers = async () => {
  try {
    const allUsers = await User.find();
    return allUsers;
  } catch (err) {
    return { message: err.message };
  }
};
