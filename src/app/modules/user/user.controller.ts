import { UserServices } from './user.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAync from '../../utils/catchAsync'
import AppError from '../../errors/AppErrors'

const createStudent = catchAync(async (req, res) => {
  const { password, student: studentData } = req.body
  // console.log(studentData)
  const result = await UserServices.createStudentIntoDB(password, studentData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student created successfully',
    data: result,
  })
})

const createAdmin = catchAync(async (req, res) => {
  const { password, admin: adminData } = req.body

  const result = await UserServices.createAdminIntoDB(password, adminData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created succesfully',
    data: result,
  })
})
const getMe = catchAync(async (req, res) => {
  const token = req.headers.authorization
  if (!token) {
    throw new AppError(httpStatus.NOT_FOUND, 'Access token not found!!!')
  }
  const result = await UserServices.getMe(token)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created succesfully',
    data: result,
  })
})

export const UserControllers = {
  createStudent,
  createAdmin,
  getMe,
}
