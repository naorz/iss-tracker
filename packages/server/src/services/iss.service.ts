import axios from 'axios'
import { ISSPosition, ISSPositionSchema, ISSPositionUpdateCb } from 'iss-schema'
import { issApiUrl, issIntervalUpdatesSec, issUseAPI } from '@/config'
import { logger } from '@/utils'
import { getMockPosition } from '@/mocks/position.mock'


export const getCurrentPosition = async (): Promise<ISSPosition> => {
  if (!issUseAPI) {
    logger.info('Using mock positions')
    return getMockPosition()
  }
  const response = await axios.get(issApiUrl)
  return ISSPositionSchema.parse(response.data)
}

export const sendCurrentPositionByInterval = (callback: ISSPositionUpdateCb, intervalMs = issIntervalUpdatesSec) => {
  const intervalFn = async () => {
    try {
      const position = await getCurrentPosition()
      callback(position)
    } catch (error) {
      clearInterval(currentInterval)
      logger.error('[Interval] fetching ISS position:', error)
      logger.error('[Interval] killed', currentInterval)
    }
  }
  intervalFn()
  const currentInterval = setInterval(intervalFn, intervalMs * 1000)

  return () => clearInterval(currentInterval)
}
