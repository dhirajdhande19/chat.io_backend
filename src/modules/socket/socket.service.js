import getUniqueId from '../../utils/getUniqueId.js';
import { Chat } from '../chat/chat.schema.js';

export const saveMsgToDb = async (data, userId) => {
  const chat = await Chat.create({
    receiverId: data.receiverId,
    senderId: userId,
    message: data.message,
    conversationId: getUniqueId(data.receiverId, userId),
  });

  return chat;
};
