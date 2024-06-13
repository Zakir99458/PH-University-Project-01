import httpStatus from 'http-status'
import AppError from '../../errors/AppErrors'
import { User } from '../user/user.model'
import { TLoginUser } from './auth.interface'
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../../config'

const loginUser = async (payload: TLoginUser) => {
  // check if the user already exist
  const isUserExist = await User.findOne({ id: payload?.id })

  //   console.log(isUserExist)
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found')
  }
  //   if User is already deleted
  const isUserDeleted = isUserExist?.isDeleted
  if (isUserDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'The user is already deleted')
  }
  //   check if user is blocked?
  const userStatus = isUserExist?.status
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'The user is blocked!!!')
  }
  // Check the password if it is correct
  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    isUserExist?.password,
  )
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.NOT_FOUND, 'Password does not match')
  }

  //   Access granted
  //   create token and send to client
  const jwtPayload = {
    userId: isUserExist.id, //isUserExist contains the whole USER information
    role: isUserExist.role,
  }
  //   console.log('jwtPayload', jwtPayload)
  const accessToken = jwt.sign(
    {
      jwtPayload,
    },
    config.jwt_access_secret as string,
    { expiresIn: '10d' },
  )

  return {
    accessToken,
    needsToChangePassword: isUserExist?.needsToChangePassword,
  }
}

const changePassword = async (
  user: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  // check for the existing password matched with with the user Given password

  const hashedPasswordFromDB = await User.findOne({
    id: user.jwtPayload.userId,
  }).select('password')
  const hashedPassword = hashedPasswordFromDB?.password
  const isOldPasswordMatched = await bcrypt.compare(
    payload.oldPassword,
    hashedPassword as string,
  )
  if (!isOldPasswordMatched) {
    throw new AppError(httpStatus.NOT_FOUND, 'Old password does not match !')
  }
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_round),
  )
  console.log(user)
  const result = await User.findOneAndUpdate(
    {
      id: user.jwtPayload.userId,
      role: user.jwtPayload.role,
    },
    {
      password: newHashedPassword,
      needsToChangePassword: false,
      passwordChangedAt: new Date(),
    },
  )
  console.log(newHashedPassword)
  return result
}

export const AuthServices = {
  loginUser,
  changePassword,
}
