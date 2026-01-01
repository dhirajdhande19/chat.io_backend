import { fetchAllUsers } from './user.service.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await fetchAllUsers();
    return res.json({ success: true, data: users });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
