import httpStatus from 'http-status'
import catchAync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { SemesterRegistrationService } from './semesterRegistration.service'

const createSemesterRegistration = catchAync(async (req, res) => {
  //   const { password, student: studentData } = req.body

  const result =
    await SemesterRegistrationService.createSemesterRegistrationIntoDB(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registration is created successfully',
    data: result,
  })
})

const getAllSemesterRegistrations = catchAync(async (req, res) => {
  //   const { password, student: studentData } = req.body

  const result =
    await SemesterRegistrationService.createSemesterRegistrationIntoDB(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registrations are retrieved successfully',
    data: result,
  })
})

const getSinglSemesterRegistration = catchAync(async (req, res) => {
  //   const { password, student: studentData } = req.body

  const result =
    await SemesterRegistrationService.createSemesterRegistrationIntoDB(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registration is retrieved successfully',
    data: result,
  })
})

const updateSemesterRegistration = catchAync(async (req, res) => {
  //   const { password, student: studentData } = req.body

  const result =
    await SemesterRegistrationService.createSemesterRegistrationIntoDB(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registration is updated successfully',
    data: result,
  })
})

export const SemesterRegistrationControllers = {
  createSemesterRegistration,
  getAllSemesterRegistrations,
  getSinglSemesterRegistration,
  updateSemesterRegistration,
}
