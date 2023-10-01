import {Router} from "express";
import app from "../index";

const router = Router()
router.get('/users', (req, res) => {
  res.send('Hello World!')
})