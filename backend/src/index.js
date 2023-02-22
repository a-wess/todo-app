import dotenv from 'dotenv'
import { connect } from './db.js'
import express from 'express'
import tasks from './tasks/tasks.route.js'
import user from './user/user.route.js'
import verify from './user/vertify.middleware.js'

dotenv.config()
console.log(process.env.PORT)
connect().then(() => {
  const app = express()
  app.use(express.json())
  app.use('/tasks', verify, tasks)
  app.use('/user', user)
  app.listen(process.env.PORT, () => console.log(`Application listening on port ${process.env.PORT}`))
}).catch(err => console.log(err))
