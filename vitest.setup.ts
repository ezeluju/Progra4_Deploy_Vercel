import '@testing-library/jest-dom'

import { vi } from 'vitest'
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

vi.mock('./src/lib/db', () => {
  return {
    connectDB: async () => {
      const mongo = await MongoMemoryServer.create()
      const uri = mongo.getUri()
      await mongoose.connect(uri)
      return mongoose
    },
  }
})

afterAll(async () => {
  await mongoose.disconnect()
})
