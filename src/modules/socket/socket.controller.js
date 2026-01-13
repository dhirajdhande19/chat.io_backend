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
  const onlineUsers = new Map();
  io.on('connection', (socket) => {
    // extract user id (senderId) from token recived from -> socket.handshake.auth.token -> decode -> set user in socket.user
    const userId = socket.user ? socket.user._id.toString() : null;
    // return when token is expired (i.e. userId will be null)
    if (!userId) return console.log('Token expired');
    if (!onlineUsers.has(userId)) {
      onlineUsers.set(userId, new Set());
    }
    onlineUsers.get(userId).add(socket.id);
    // join the room to user's _id
    socket.join(userId);
    /*
      Send status to reciver's ID
    */
    socket.broadcast.emit('user-status', { userId, online: true });

    console.log(`user ${socket.user.name} is online`);

    socket.emit('online-users', Array.from(onlineUsers.keys()));
    // send message to next person (to their _id room)
    socket.on(
      'chat message',
      wrapSocketAsync(async (data) => {
        // store message to db call service
        await saveMsgToDb(data, userId);

        const msg = {
          senderId: userId,
          receiverId: data.receiverId,
          message: data.message,
          createdAt: new Date(),
        };

        // emit message to user (to their room _id)
        io.to(data.receiverId).emit('chat message', msg);
        // send to user too
        io.to(userId).emit('chat message', msg);
      })
    );

    // handle disconnection & mark {status: offline}
    socket.on('disconnect', () => {
      console.log(`user ${socket.user.name} disconnected`);
      const sockets = onlineUsers.get(userId);
      if (sockets) {
        sockets.delete(socket.id);
        if (sockets.size === 0) {
          onlineUsers.delete(userId);
          socket.broadcast.emit('user-status', { userId, online: false });
          console.log(`user ${socket.user.name} is offline`);
        }
      }
    });
  });
};
