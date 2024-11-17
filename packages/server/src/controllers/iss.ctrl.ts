import { Request, Response } from 'express'
import { getCurrentPosition } from '@/services/iss.service'
import { logger } from '@/utils'

export const getPosition = async (req: Request, res: Response): Promise<void> => {
  try {
    const position = await getCurrentPosition()
    res.json(position)
    logger.info('ISS position:', position)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch ISS position' })
    logger.error('fetching ISS position:', error)
  }
}
