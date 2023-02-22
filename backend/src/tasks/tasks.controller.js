import { ObjectId } from 'mongodb'
import getDB from '../db.js'

/**
 * @typedef {Object} Task
 * @property {number | null} id in database
 * @property {string} text task's description
 * @property {string} userId id of the owner
 * @property {boolean} finished checked if task was finished
 */

class TaskController {
  /**
   * @returns {Task} - newly created task from database
   */
  async create (request) {
    const db = getDB()
    const tasks = db.collection('tasks')

    const resp = await tasks.insertOne({
      text: request.text,
      finished: false,
      userId: request.userId
    })

    return {
      id: resp.insertedId,
      text: request.text,
      finished: false
    }
  }

  /**
   * Partially or fully update task
   * @param { id } request.id - id of a task
   * @param { text } request.text - body of a task
   * @param { finished } request.finished - tasks's status
   * @returns { Task } - updated task
   */
  async update (request) {
    const payload = {}
    if (request.text && request.text?.length > 0) payload.text = request.text
    if (typeof (request.finished) === 'boolean') payload.finished = request.finished

    const tasks = getDB().collection('tasks')

    const resp = await tasks.findOneAndUpdate(
      { _id: new ObjectId(request.id), userId: request.userId },
      { $set: payload },
      { returnOriginal: false }
    )

    if (!resp.value) throw new RequestError('Update: Item was not found')

    return {
      id: resp.value._id,
      text: payload.text ?? resp.value.text,
      finished: payload.finished ?? resp.value.finished
    }
  }

  async delete (request) {
    const tasks = getDB().collection('tasks')

    const resp = await tasks.deleteOne({ _id: new ObjectId(request.id), userId: request.userId })
    if (resp.deletedCount < 1) throw new RequestError('Delete: Item was not found')

    return { status: 'ok' }
  }

  /**
   * Return list of tasks
   * @param request.query search query
   */
  async list (request) {
    const tasks = getDB().collection('tasks')

    const words = request.query?.split(' ').map(str => '"' + str + '"').join(' ') ?? ''
    const query = (words !== '""') ? { $text: { $search: words }, userId: request.userId } : null
    const results = await tasks.find(query ?? { userId: request.userId }).toArray()

    return results.map(task => ({
      id: task._id,
      text: task.text,
      finished: task.finished
    }))
  }
}

export class RequestError extends Error {
  constructor (message) {
    super(message)
    this.name = 'RequestError'
  }
}

export default TaskController
