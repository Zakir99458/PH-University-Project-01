export type TErrorSrource = {
  path: string | number
  message: string
}[]

export type TGenericErrRes = {
  statusCode: number
  message: string
  errorSources: TErrorSrource
}
