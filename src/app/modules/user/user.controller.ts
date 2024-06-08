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
export const UserControllers = {
  createStudent,
}
