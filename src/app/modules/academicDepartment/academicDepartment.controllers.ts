import httpStatus from 'http-status'
import sendResponse from '../../utils/sendResponse'
import { AcademicDepartmentServices } from './academicDepartment.service'
import catchAync from '../../utils/catchAsync'

const createAcademicDepartment = catchAync(async (req, res) => {
  //   const { password, student: studentData } = req.body

  const result =
    await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department is created successfully',
    data: result,
  })
})

const getAllAcademicFaculty = catchAync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.getAllAcademicDepartmentFromDB()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Academic Department are retrieved successfully',
    data: result,
  })
})
const getSingleAcademicFaculty = catchAync(async (req, res) => {
  const { departmentsId } = req.params

  const result =
    await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(
      departmentsId,
    )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department is retrieved successfully',
    data: result,
  })
})

const updateAcademicFaculty = catchAync(async (req, res) => {
  const { departmentsId } = req.params

  const result =
    await AcademicDepartmentServices.updateAcademicDepartmentIntoDB(
      departmentsId,
      req.body,
    )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department is updated successfully',
    data: result,
  })
})

export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
}
