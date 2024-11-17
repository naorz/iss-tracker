import { Router } from 'express'
import { getPosition } from '@/controllers/iss.ctrl'

export const issRouter = Router()

issRouter.get('/iss/position', getPosition)
