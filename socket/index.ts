import {Server} from "socket.io";
import RoomController from "../controllers/room";

require('dotenv').config({path: '.env'});

export const io = new Server({
  cors: {
    origin: '*'
  }
});


export const initSockets = () => {
  io.listen(Number(process.env.SOCKETS_PORT));

  io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('join room', async (value) => {
      const {roomId, userName, userId} = value
      socket.join(roomId);
      // const currentRoom = await RoomController.getRoom(roomId)
      //
      // await RoomController.update(roomId, {
      //   ...currentRoom,
      //   usersOnline: [...currentRoom.usersOnline, {
      //     name: userName,
      //     _id: userId
      //   }]
      // })

      // console.log(currentRoom)
      console.log(userName, 'user connected to room', roomId);
    })

    socket.on('leave room', async (value) => {
      const {roomId, userId} = value
      socket.leave(roomId);

      // const currentRoom = await RoomController.getRoom(roomId)
      // await RoomController.update(roomId, {
      //   ...currentRoom,
      //   usersOnline: currentRoom?.usersOnline?.filter(user => user._id !== userId)
      // })
    })

    socket.on('update room', (data) => {
      io.to(data.room).emit('room', data.value)
      console.log(`Получено сообщение в комнате ${data.room}: ${data.message}`);
    })

    socket.on('disconnect', (socket) => {
      console.log('user disconnected');
    })

  })
}