import getUniqueId from '../../utils/getUniqueId.js';
import { Chat } from '../chat/chat.schema.js';

export const saveMsgToDb = async (data) => {
  const chat = await Chat.create({
    reciverId: data.reciverId,
    senderId: data.senderId,
    message: data.message,
    conversationId: getUniqueId(data.receiverId, data.senderId),
  });
  chat.save();

  return chat;
};
