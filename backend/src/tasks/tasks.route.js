import express from 'express'
import TaskController from './tasks.controller.js'

const router = express.Router()
/**
 * Fetch list of tasks
 */
router.get('/', async (req, res) => {
  const controller = new TaskController()

  try {
    res.status(200)
    res.send(await controller.list({ userId: req.userId, ...req.query }))
  } catch (err) {
    res.status(500)
    res.send({ message: err.message })
  }
})

/**
 * Create new task
 */
router.post('/', async (req, res) => {
  const controller = new TaskController()

  try {
    res.status(201)
    res.send(await controller.create({ userId: req.userId, ...req.body }))
  } catch (err) {
    if (err?.name === 'RequestError') res.status(400)
    else res.status(500)

    res.send({ message: err.message })
  }
})

/**
 * Updates task data by id
 */
router.patch('/:id', async (req, res) => {
  const controller = new TaskController()

  try {
    res.status(200)
    res.send(await controller.update({
      id: req.params.id,
      userId: req.userId,
      ...req.body
    }))
  } catch (err) {
    if (err?.name === 'RequestError') res.status(400)
    else res.status(500)

    res.send({ message: err.message })
  }
})

/**
 * Delete task by id
 */
router.delete('/:id', async (req, res) => {
  const controller = new TaskController()

  try {
    res.status(200)
    res.send(await controller.delete({ userId: req.userId, id: req.params.id }))
  } catch (err) {
    if (err?.name === 'RequestError') res.status(400)
    else res.status(500)

    res.send({ message: err.message })
  }
})

export default router
