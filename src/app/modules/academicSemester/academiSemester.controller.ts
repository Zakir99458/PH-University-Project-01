import { UserServices } from './user.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAync from '../../utils/catchAsync'
import { AcademicSemesterServices } from './academicSemester.service'

const createAcademicSemester = catchAync(async (req, res) => {
  //   const { password, student: studentData } = req.body

  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester is created successfully',
    data: result,
  })
})
export const AcademicSemesterControllers = {
  createAcademicSemester,
}
