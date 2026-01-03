import wrapAsync from '../../middleware/wrapAsync.js';
import getUniqueId from '../../utils/getUniqueId.js';
import { extractPrevChats } from './chat.service.js';

export const getPrevChats = wrapAsync(async (req, res) => {
  const { reciverId } = req.params; // extract from url
  const senderId = req.user._id; // extract from jwt
  const conversationId = getUniqueId(reciverId, senderId);

  // call service
  const prevChats = await extractPrevChats(conversationId);

  return res.json({ success: true, chats: prevChats });
});
