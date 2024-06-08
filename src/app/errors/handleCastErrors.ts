import mongoose from 'mongoose'
import { TErrorSrource, TGenericErrRes } from '../interface/error'

const handleCastError = (err: mongoose.Error.CastError): TGenericErrRes => {
  const errorSources: TErrorSrource = [
    {
      path: err?.path,
      message: err?.message,
    },
  ]
  const statusCode = 400
  return {
    statusCode,
    message: 'Cast Error',
    errorSources,
  }
}

export default handleCastError
