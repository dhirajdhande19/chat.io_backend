import wrapAsync from '../../middleware/wrapAsync.js';
import { User } from './user.schema.js';
import { fetchAllUsers } from './user.service.js';

export const getAllUsers = wrapAsync(async (req, res) => {
  const users = await fetchAllUsers();
  return res.json({ users });
});

export const getUserInfo = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  return res.json(user);
});
