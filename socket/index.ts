import {Server} from "socket.io";

export const io = new Server({
  cors: {
    origin: "http://localhost:3000"
  }
});

export const initSockets = () => {

  io.listen(9090);

  io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('join room', (room) => {
      socket.join(room);
      console.log('user connected to room', room);
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