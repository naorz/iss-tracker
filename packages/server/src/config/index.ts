import dotenv from 'dotenv'
import { LogLevel } from '@/types'
const { PORT, LOG_LEVEL, LOG_PREFIX } = process.env

dotenv.config()

export const SERVER_CONFIG = {
  PORT: PORT || 3000,
  LOG_LEVEL: LOG_LEVEL ? LogLevel[LOG_LEVEL.toUpperCase() as keyof typeof LogLevel] : LogLevel.INFO,
  LOG_PREFIX: LOG_PREFIX || '[ISS-TRACKER]',
}

export * from './iss.conf'
