import { Response } from 'express'

export type TResponse<T> = {
  statusCode: number
  message: string
  success?: boolean
  data: T
}
const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode).json({
    statusCode: data.statusCode,
    success: data.success,
    message: data.message,
    data: data.data,
  })
}

export default sendResponse
