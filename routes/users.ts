import {Router} from "express";
import {userCreateValidator, userLoginValidator, userUpdateValidator} from "../schemes/user";
import UserController from "../controllers/user";

const users = Router()
users.post('/', async (req, res) => {
  const {error, value} = userCreateValidator.validate(req.body)

  if (error) {
    res.status(400).send(error.details[0].message)
    return
  }

  const user = await UserController.create(value)
  res.send(user)
})

users.put('/', async (req, res) => {
  const {error, value} = userUpdateValidator.validate(req.body)

  if (error) {
    res.status(400).send(error.details[0].message)
    return
  }

  const user = await UserController.update(value._id, value)

  res.send(user)
})
users.get('/', async (req, res) => {
  const users = await UserController.getAll()

  res.send(users)
})

users.post('/login', async (req, res) => {
  const {email, password} = req.body

  const {value, error} = userLoginValidator.validate({email, password})

  if (error) {
    res.status(400).send(error.details[0].message)
    return
  }

  const user = await UserController.login(value.email, value.password)

  res.send(user)
})

users.get('/:id', async (req, res) => {
  const id = req.params.id
  const user = await UserController.getUser(id)
  console.log(user)
  res.send(user)
})


export default users