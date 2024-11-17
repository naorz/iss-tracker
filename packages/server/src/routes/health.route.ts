import { Request, Response } from 'express'

export const healthCtrl = (req: Request, res: Response) => {
  res.status(200).json({ status: 'UP' })
}
