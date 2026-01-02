import { Server } from 'socket.io';
import { saveMsgToDb } from './socket.service.js';
import wrapSocketAsync from '../../middleware/wrapSocketAsync.js';

export const connectToSocket = async (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      allowedHeaders: ['*'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    // join the room
    const userId = "active user's id"; // TODO (after register/login): read from jwt
    socket.join(userId);

    // send message to next person
    socket.on(
      'chat message',
      wrapSocketAsync(async (data) => {
        //   console.log({
        //     senderId: data.senderId,
        //     receiverId: data.receiverId,
        //     message: data.message,
        //   });

        // store message to db
        // call service
        await saveMsgToDb(data);

        // emit message to user
        io.to(data.receiverId).emit('chat message', {
          senderId: data.senderId,
          message: data.message,
        });
      })
    );

    // on disconnect
    socket.on('disconnect', () => {
      console.log(`User: ${userId} disconnected.`);
    });
  });
};
