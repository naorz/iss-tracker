import { Socket } from 'socket.io'
import { Server } from 'socket.io'
import { registerSocketEvents } from './events'
import { logger } from '@/utils'

export const registerSocketIo = (socketIo: Server) => {
  socketIo.on('connection', (socket: Socket) => {
    logger.info('Client connected')
    registerSocketEvents(socket)
  })
}
