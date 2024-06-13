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
  // console.log('from controller:', req.user, req.body, passwordData.oldPassword)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password is successfully changed',
    data: result,
  })
})

export const AuthControllers = {
  loginUser,
  changePassword,
}
