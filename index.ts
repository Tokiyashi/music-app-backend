import {Server} from "socket.io"
import userRouter from "./routes/users"
import roomsRouter from "./routes/rooms"
import mongoose from "mongoose";

require('dotenv').config({path: '.env'});
const express = require('express')
const app = express({cors: true, origin: "http://localhost:3000"})
const port = 9000
const cors = require('cors')
mongoose.connect(process.env.DATABASE_URL)
app.use(express.json())
app.use(cors())
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
const io = new Server({
  cors: {
    origin: "http://localhost:3000"
  }
});
io.listen(9090);
io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('message', (data) => {
    socket.send(data)
  })

  socket.on('disconnect', (socket) => {
    console.log('user disconnected');
  })

})

app.use("/users", userRouter)
app.use("/rooms", roomsRouter)
export default app