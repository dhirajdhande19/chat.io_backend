import { Server } from 'socket.io';
import { saveMsgToDb } from './socket.service.js';
import wrapSocketAsync from '../../middleware/wrapSocketAsync.js';
import { socketAuthMiddleware } from '../../middleware/socketAuthMiddleware.js';

export const connectToSocket = async (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      allowedHeaders: ['*'],
      credentials: true,
    },
  });

  io.use(socketAuthMiddleware);

  io.on('connection', (socket) => {
    // extract user id (senderId) from token recived from -> socket.handshake.auth.token -> decode -> set user in socket.user
    const userId = socket.user._id.toString();
    // join the room to user's _id
    socket.join(userId);
    /*
      Update user staus Offline/Online
    */
    io.emit('user-status', { online: true });
    console.log(`user: ${userId} is online`);

    // send message to next person (to their _id room)
    socket.on(
      'chat message',
      wrapSocketAsync(async (data) => {
        // store message to db call service
        await saveMsgToDb(data);

        // emit message to user (to their room _id)
        io.to(data.receiverId).emit('chat message', {
          senderId: data.senderId,
          message: data.message,
        });
      })
    );

    // handle disconnection & mark {status: offline}
    socket.on('disconnect', () => {
      io.emit('user-status', { online: false });
      console.log(`user: ${userId} is offline`);
    });
  });
};
