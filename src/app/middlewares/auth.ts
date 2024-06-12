import { NextFunction, Request, Response } from 'express'
import catchAync from '../utils/catchAsync'
import AppError from '../errors/AppErrors'
import httpStatus from 'http-status'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config'
import { TUseRole } from '../modules/user/user.interface'

const auth = (...requireRoles: TUseRole[]) => {
  return catchAync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
    // console.log(token)

    // if the token is sent from the client
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!!')
    }
    // invalid token
    jwt.verify(
      token,
      config.jwt_access_secret as string,
      function (err, decoded) {
        // err
        if (err) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            'You are not authorized!!',
          )
        }
        // decoded undefined
        const role = (decoded as JwtPayload)?.role
        if (requireRoles && !requireRoles.includes(role))
          req.user = decoded as JwtPayload
        next()
        // console.log('decoded:', decoded)
      },
    )
  })
}

export default auth
