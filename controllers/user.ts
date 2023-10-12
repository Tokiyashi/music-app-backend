import {User} from "../models/User";

const UserController = {
  getUser: async (id: string) => {
    const user = await User.findById(id)

    return user
  },

  login: async (email: string, password: string) => {
    const user = await User.findOne({email, password})

    return user
  },

  getAll: async () => {
    const user = await User.find({})

    return user
  },

  create: async (value: typeof User) => {
    const user = await User.create(value)

    return user
  },

  update: async (id: string, value: typeof User) => {
    const user = await User.findByIdAndUpdate(id, value)

    return user
  }
}
export default UserController