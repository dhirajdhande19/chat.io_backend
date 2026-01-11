import { JWT_SECRET } from '../config/env.js';
import { User } from '../modules/user/user.schema.js';
import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export default authMiddleware;
