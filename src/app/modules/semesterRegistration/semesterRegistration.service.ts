import httpStatus from 'http-status'
import AppError from '../../errors/AppErrors'
import { AcademicSemester } from '../academicSemester/academiSemester.model'
import { TSemesterRegistration } from './semesterRegistration.interface'
import { SemesterRegistration } from './semesterRegistration.model'

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester
  // Check if the Semster is already registered
  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  })
  if (isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This semester is already registered !',
    )
  }
  // check if the semester is exist
  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester)
  if (!isAcademicSemesterExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This academic semester is not found !',
    )
  }
  const result = await SemesterRegistration.create(payload)
  return result
}

const getAllSemesterRegistrationFromDB = async () => {}

const getSingleSemesterRegistrationFromDB = async () => {}

const updateSemesterRegistrationIntoDB = async () => {}

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
}
