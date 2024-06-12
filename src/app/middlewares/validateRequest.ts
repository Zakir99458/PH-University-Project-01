import { NextFunction, Request, Response } from 'express'
import { AnyZodObject } from 'zod'
import catchAync from '../utils/catchAsync'

const validateRequest = (schema: AnyZodObject) => {
  return catchAync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync({
      body: req.body,
    })
    next()
  })
}

export default validateRequest
