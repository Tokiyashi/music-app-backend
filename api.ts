import userRouter from "./routes/users"
import roomsRouter from "./routes/rooms"
import mongoose from "mongoose";
import {initSockets} from "./socket";
import {Router} from "express";

require('dotenv').config({path: '.env'});

const express = require('express')

const app = express({
  cors: true,
  origin: process.env.ORIGIN_URL
})

const port = Number(process.env.PORT)
const cors = require('cors')

mongoose.connect(process.env.DATABASE_URL)

app.use(express.json())
app.use(cors())

const router = Router()


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

initSockets();
app.use("/users", userRouter)
app.use("/rooms", roomsRouter)
