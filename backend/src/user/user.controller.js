import getDB from '../db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class RequestError extends Error {
  constructor (message, status = '400') {
    super(message)
    this.name = 'RequestError'
    this.status = status
  }
}

export default class UserController {
  async register (request) {
    if (!request.name || !request.password) throw new RequestError('Missing required fields')

    const { name, password } = request

    const users = getDB().collection('users')

    const existing = await users.findOne({ name })
    if (existing) throw new RequestError('User already exists', 409)

    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt)

    const resp = await users.insertOne({
      name,
      password: hashed,
      salt
    })

    const token = jwt.sign(
      { userId: resp.insertedId },
      process.env.TOKEN_KEY,
      {
        expiresIn: '1h'
      }
    )

    return { token }
  }

  async login (request) {
    if (!request.name || !request.password) throw new RequestError('Missing required fields')

    const { name, password } = request

    const users = getDB().collection('users')

    const user = await users.findOne({ name })
    if (!user) throw new RequestError('User does not exist', 404)

    const hashed = await bcrypt.hash(password, user.salt)
    if (hashed !== user.password) throw new RequestError('Wrong password', 400)

    const token = jwt.sign(
      { userId: user._id },
      process.env.TOKEN_KEY,
      {
        expiresIn: '1h'
      }
    )

    return { token }
  }
}
