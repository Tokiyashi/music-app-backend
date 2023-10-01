import {Router} from "express";

const users = Router()

users.get('/', (req, res) => {
  res.send('Hello World!')
})

export default users