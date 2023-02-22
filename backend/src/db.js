import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()

const uri =
  `mongodb://${process.env.MONGO_USERNAME}` +
  `:${process.env.MONGO_PASSWORD}` +
  `@${process.env.MONGO_ADDRESS}/${process.env.MONGO_DB}`

let database = null

export async function connect () {
  console.log(uri)
  const client = await MongoClient.connect(uri)
  database = client.db(process.env.MONGO_DB)
}

export default function getDB () { return database }
