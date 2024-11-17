import { Socket } from 'socket.io'
import { ISSPosition, SocketEvents } from 'iss-schema'
import { sendCurrentPositionByInterval } from '@/services/iss.service'
import { logger } from '@/utils'


export const positionUpdater = async (socket: Socket) => {
  logger.info(`[Socket: ${socket.id}] [${SocketEvents.ISS_POSITION_UPDATES}] Starting updates for client`)

  const intervalDestructor = sendCurrentPositionByInterval((position: ISSPosition) => {
    logger.info(`[Socket: ${socket.id}] [${SocketEvents.ISS_POSITION_UPDATES}] update`, position)
    socket.emit(SocketEvents.ISS_POSITION_UPDATES, position)
  })

  socket.on('disconnect', () => {
    intervalDestructor()
    logger.info('Client disconnected')
  })
}
