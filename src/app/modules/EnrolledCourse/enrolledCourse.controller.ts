import httpStatus from 'http-status'
import catchAync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { EnrolledCourseServices } from './enrolledCourse.service'

const createEnrolledCourse = catchAync(async (req, res) => {
  const result = await EnrolledCourseServices.createEnrolledCoureseIntoDB()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is enrolled successfully',
    data: result,
  })
})

export const EnrolledCourseControllers = {
  createEnrolledCourse,
}
