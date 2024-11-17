import { Router } from 'express'
import { issRouter } from './iss.routes'
import { healthCtrl } from './health.route'

export const mainRouter = Router()

mainRouter.use('/health', healthCtrl)

// Auth routes
// TODO: Add auth middleware
mainRouter.use('/api', issRouter)
