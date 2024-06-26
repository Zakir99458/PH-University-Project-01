import httpStatus from 'http-status'
import catchAync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { EnrolledCourseServices } from './enrolledCourse.service'

const createEnrolledCourse = catchAync(async (req, res) => {
  const userId = req.user.jwtPayload.userId
  const result = await EnrolledCourseServices.createEnrolledCourseIntoDB(
    userId,
    req.body,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is enrolled successfully',
    data: result,
  })
})

const updateEnrolledCourseMarks = catchAync(async (req, res) => {
  const facultyId = req.user.userId
  const result = await EnrolledCourseServices.updateEnrolledCourseMarksIntoDB(
    facultyId,
    req.body,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Marks is updated succesfully',
    data: result,
  })
})

export const EnrolledCourseControllers = {
  createEnrolledCourse,
  updateEnrolledCourseMarks,
}
