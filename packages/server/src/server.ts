import { createServer } from 'http'
import express from 'express'
import cors from 'cors'
import { Server } from 'socket.io'
import { mainRouter } from './routes'
import { registerSocketIo } from './socket'
import { SERVER_CONFIG } from './config'
import { logger } from './utils'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

app.use(cors())
app.use(express.json())
app.use(mainRouter)

registerSocketIo(io)

httpServer.listen(SERVER_CONFIG.PORT, () => {
  logger.info(`Server running on port ${SERVER_CONFIG.PORT}`)
})

export default app
