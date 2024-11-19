import axios from 'axios'
import { ISSPosition, ISSPositionSchema, ISSPositionUpdateCb } from 'iss-schema'
import { issApiUrl, issPollingIntervalSeconds, issUseMock } from '@/config'
import { logger } from '@/utils'
import { getMockPosition } from '@/mocks/position.mock'


export const getCurrentPosition = async (): Promise<ISSPosition> => {
  if (issUseMock) {
    logger.warn('Using mock positions')
    return getMockPosition()
  }
  const response = await axios.get(issApiUrl)
  return ISSPositionSchema.parse(response.data)
}

/**
 * @description Send current position by interval
 * @param callback
 * @param intervalMs
 * @returns interval destructor function
 */

export const sendCurrentPositionByInterval = (callback: ISSPositionUpdateCb, intervalMs = issPollingIntervalSeconds) => {
  const intervalFn = async () => {
    try {
      const position = await getCurrentPosition()
      callback(position)
    } catch (error) {
      clearInterval(currentIntervalId)
      logger.error('[Interval] fetching ISS position:', error)
      logger.error('[Interval] killed', currentIntervalId)
    }
  }
  intervalFn()
  const currentIntervalId = setInterval(intervalFn, intervalMs * 1000)

  return () => clearInterval(currentIntervalId)
}
