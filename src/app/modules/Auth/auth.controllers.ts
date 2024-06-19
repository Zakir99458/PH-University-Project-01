import httpStatus from 'http-status'
import catchAync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AuthServices } from './auth.services'

const loginUser = catchAync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in successfully',
    data: result,
  })
})

const changePassword = catchAync(async (req, res) => {
  const { ...passwordData } = req.body
  const result = await AuthServices.changePassword(req.user, passwordData)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password is changed successfully!! ',
    data: result,
  })
})

const forgetPassword = catchAync(async (req, res) => {
  const userId = req.body.id
  const result = await AuthServices.forgetPassword(userId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reset link is generated successfully!! ',
    data: result,
  })
})

const resetPassword = catchAync(async (req, res) => {
  const token = req.headers.authorization

  const result = await AuthServices.resetPassword(req.body, token)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password is resetted successfully!! ',
    data: result,
  })
})

export const AuthControllers = {
  loginUser,
  changePassword,
  forgetPassword,
  resetPassword,
}
