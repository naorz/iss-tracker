import { Socket } from 'socket.io'
import { positionUpdater } from './positionUpdater'
import { onAskPosition } from './onAskPosition'
import { logger } from '@/utils'

// Can be collected from multiple files using glob
const socketEvents = [
  positionUpdater,
  onAskPosition,
]

export const registerSocketEvents = (socket: Socket) => {
  logger.info('Socket registering events...')
  socketEvents.forEach(xEvent => xEvent(socket))
  logger.info('Socket events registered')
}
