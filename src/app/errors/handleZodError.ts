import { ZodError, ZodIssue } from 'zod'
import { TErrorSrource, TGenericErrRes } from '../interface/error'

const handleZodError = (err: ZodError): TGenericErrRes => {
  const errorSources: TErrorSrource = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    }
  })

  const statusCode = 400
  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  }
}

export default handleZodError
