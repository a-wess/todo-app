import express from 'express'
import UserController from './user.controller.js'

const router = express.Router()

router.post('/register', async (req, res) => {
  const controller = new UserController()

  try {
    res.send(await controller.register(req.body))
  } catch (err) {
    if (err?.name === 'RequestError') res.status(err.status)
    else res.status(500)

    res.send({ message: err.message })
  }
})

router.post('/login', async (req, res) => {
  const controller = new UserController()

  try {
    res.send(await controller.login(req.body))
  } catch (err) {
    if (err?.name === 'RequestError') res.status(err.status)
    else res.status(500)

    res.send({ message: err.message })
  }
})

export default router
