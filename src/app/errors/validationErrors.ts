import mongoose, { Mongoose } from 'mongoose'
import { TErrorSrource } from '../interface/error'

const handleValidationError = (err: mongoose.Error.ValidationError) => {
  const errorSources: TErrorSrource = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      }
    },
  )
  const statusCode = 400
  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  }
}

export default handleValidationError
