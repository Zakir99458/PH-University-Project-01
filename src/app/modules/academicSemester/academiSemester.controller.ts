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

const getAllAcademicSemester = catchAync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemesterFromDB()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Academic Semesters are retrieved successfully',
    data: result,
  })
})
const getSingleAcademicSemester = catchAync(async (req, res) => {
  const { semesterId } = req.params

  const result =
    await AcademicSemesterServices.getSingleAcademicSemesterFromDB(semesterId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester is retrieved successfully',
    data: result,
  })
})

const updateAcademicSemester = catchAync(async (req, res) => {
  const { semesterId } = req.params

  const result = await AcademicSemesterServices.udateAcademicSemesterIntoDB(
    semesterId,
    req.body,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester is updated successfully',
    data: result,
  })
})

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getSingleAcademicSemester,
  updateAcademicSemester,
  getAllAcademicSemester,
}
