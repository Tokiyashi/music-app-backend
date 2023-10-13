import userRouter from "./routes/users"
import roomsRouter from "./routes/rooms"
import mongoose from "mongoose";
import {initSockets} from "./socket";

const express = require('express')
const app = express({
  cors: true,
  origin: process.env.DEVELOP ? "http://localhost:3000" : "https://tune-town.netlify.app"
})
require('dotenv').config({path: '.env'});

const port = 9000
const cors = require('cors')

mongoose.connect(process.env.DATABASE_URL)

app.use(express.json())
app.use(cors())

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

initSockets();
app.use("/users", userRouter)
app.use("/rooms", roomsRouter)
export default app