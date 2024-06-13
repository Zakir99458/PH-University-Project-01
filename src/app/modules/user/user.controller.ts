import { UserServices } from './user.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAync from '../../utils/catchAsync'

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

export const UserControllers = {
  createStudent,
  createAdmin,
}
