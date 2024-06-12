import httpStatus from 'http-status'
import AppError from '../../errors/AppErrors'
import { User } from '../user/user.model'
import { TLoginUser } from './auth.interface'
import bcrypt from 'bcrypt'

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
  console.log(isPasswordMatched)
  //   Access granted
  return {}
}

export const AuthServices = {
  loginUser,
}
