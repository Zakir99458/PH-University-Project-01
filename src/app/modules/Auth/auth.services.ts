import httpStatus from 'http-status'
import AppError from '../../errors/AppErrors'
import { User } from '../user/user.model'
import { TLoginUser } from './auth.interface'
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../../config'
import { sendEmail } from '../../utils/sendEmail'

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

  return result
}

const forgetPassword = async (userId: string) => {
  const id = userId
  const isUserExist = await User.findOne({ id })

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

  // Token
  const jwtPayload = {
    userId: isUserExist.id, //isUserExist contains the whole USER information
    role: isUserExist.role,
  }
  //   console.log('jwtPayload', jwtPayload)
  const resetToken = jwt.sign(
    {
      jwtPayload,
    },
    config.jwt_access_secret as string,
    { expiresIn: '10m' },
  )
  const resetUiLink = `${config.reset_pass_ui_link}.?id=${isUserExist.id}&token=${resetToken}`
  console.log(resetUiLink)

  sendEmail(isUserExist.email, resetUiLink)
}

const resetPassword = async (
  payload: { id: string; newPassword: string },
  token: string,
) => {
  const id = payload?.id
  const isUserExist = await User.findOne({ id })

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

  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload
  if (decoded.jwtPayload.userId !== id) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is forbidden, not matched!!')
  }

  const hashedNewPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_round),
  )

  await User.findOneAndUpdate(
    {
      id: decoded.jwtPayload.userId,
      role: decoded.jwtPayload.role,
    },
    {
      password: hashedNewPassword,
      needsToChangePassword: false,
      passwordChangedAt: new Date(),
    },
  )
}

export const AuthServices = {
  loginUser,
  changePassword,
  forgetPassword,
  resetPassword,
}
