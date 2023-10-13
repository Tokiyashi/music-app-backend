import userRouter from "./routes/users"
import roomsRouter from "./routes/rooms"
import mongoose from "mongoose";
import {initSockets} from "./socket";
import serverless from "serverless-http";

const express = require('express')
const app = express({
  cors: true,
  origin: '*'
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
export const handler = serverless(app);