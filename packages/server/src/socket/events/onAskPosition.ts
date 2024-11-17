import { Socket } from 'socket.io'
import { SocketEvents } from 'iss-schema'
import { getCurrentPosition } from '@/services/iss.service'
import { logger } from '@/utils'

export const onAskPosition = async (socket: Socket) => {
  socket.on(SocketEvents.GET_POSITION, async () => {
    logger.info(`[Socket: ${socket.id}] [${SocketEvents.GET_POSITION}] Client requested position NOW`)
    try {
      const position = await getCurrentPosition()
      socket.emit(SocketEvents.ISS_POSITION_UPDATES, position)
      logger.info(`[Socket: ${socket.id}] [${SocketEvents.ISS_POSITION_UPDATES}] position sent`)
    } catch (error) {
      logger.error('fetching ISS position:', error)
    }
  })
}
