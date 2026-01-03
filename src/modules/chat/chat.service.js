import wrapAsync from '../../middleware/wrapAsync.js';
import { Chat } from './chat.schema.js';

export const extractPrevChats = async (conversationId) => {
  const prevChats = await Chat.find({ conversationId });
  return prevChats;
};
