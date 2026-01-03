import mongoose, { Schema } from 'mongoose';

const chatSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
    senderId: {
      type: String,
      required: true,
    },
    reciverId: {
      type: String,
      required: true,
    },
    // New field: conversationId
    /* 
      instead of creating new order for each and every chat (which won't be consistant 
      when sent from frontend -> coz if we refresh page the count will reset).
      so we create a unique id to distinguish between chats both :
      senderId (sender user) and receiverId (reciver user) will share same id like:
      conversationId: [senderId, reciverId].sort().join("_");
      so for both users id will be same coz its sorted and seperated by _
    */
    conversationId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model('Chat', chatSchema);
export { Chat };
