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

export const AuthControllers = {
  loginUser,
}
