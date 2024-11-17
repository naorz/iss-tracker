/* eslint-disable no-console */
import { SERVER_CONFIG } from '@/config'
import { LogLevel } from '@/types'

const { LOG_LEVEL, LOG_PREFIX } = SERVER_CONFIG

class Logger {
  private level: LogLevel

  constructor(level: LogLevel = LogLevel.INFO) {
    this.level = level
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.level
  }

  trace(...args: unknown[]): void {
    if (this.shouldLog(LogLevel.TRACE)) {
      console.log(LOG_PREFIX, '[TRACE]', ...args)
    }
  }

  debug(...args: unknown[]): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      console.log(LOG_PREFIX, '[DEBUG]', ...args)
    }
  }

  info(...args: unknown[]): void {
    if (this.shouldLog(LogLevel.INFO)) {
      console.log(LOG_PREFIX, '[INFO]', ...args)
    }
  }

  warn(...args: unknown[]): void {
    if (this.shouldLog(LogLevel.WARN)) {
      console.warn(LOG_PREFIX, '[WARN]', ...args)
    }
  }

  error(...args: unknown[]): void {
    if (this.shouldLog(LogLevel.ERROR)) {
      console.error(LOG_PREFIX, '[ERROR]', ...args)
    }
  }
}

const logger = new Logger(LOG_LEVEL)

export { logger }
