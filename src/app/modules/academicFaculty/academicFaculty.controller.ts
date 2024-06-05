import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAync from '../../utils/catchAsync'
import { AcademicFacultyServices } from './academicFaculty.service'

const createAcademicFaculty = catchAync(async (req, res) => {
  //   const { password, student: studentData } = req.body

  const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(
    req.body,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty is created successfully',
    data: result,
  })
})

const getAllAcademicFaculty = catchAync(async (req, res) => {
  const result = await AcademicFacultyServices.getAllAcademicFacultiesFromDB()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Academic Faculty are retrieved successfully',
    data: result,
  })
})
const getSingleAcademicFaculty = catchAync(async (req, res) => {
  const { facultyId } = req.params

  const result =
    await AcademicFacultyServices.getSingleAcademicFacultyFromDB(facultyId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty is retrieved successfully',
    data: result,
  })
})

const updateAcademicFaculty = catchAync(async (req, res) => {
  const { facultyId } = req.params

  const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(
    facultyId,
    req.body,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester is updated successfully',
    data: result,
  })
})

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
}
