import httpStatus from 'http-status'
import AppError from '../../errors/AppErrors'
import { AcademicSemester } from '../academicSemester/academiSemester.model'
import { TSemesterRegistration } from './semesterRegistration.interface'
import { SemesterRegistration } from './semesterRegistration.model'
import QueryBuilder from '../../builder/QueryBuilder'

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester

  //   check if there any ongoing or upcoming registration
  const isThereAnyUpcomingOrOngoingSemester =
    await SemesterRegistration.findOne({
      $or: [{ status: 'ONGOING' }, { status: 'UPCOMING' }],
    })

  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `theris already ${isThereAnyUpcomingOrOngoingSemester.status}`,
    )
  }

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

const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = semesterRegistrationQuery.modelQuery
  return result
}

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result = SemesterRegistration.findById(id)

  return result
}

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  // if the requested semester is exist
  const isSemesterRegistrationExists = await SemesterRegistration.findById(id)
  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, `This semester is not found`)
  }
  // if the requested semester is ended, we will not update anything
  const currentSemesterRegistrationStatus = isSemesterRegistrationExists

  if (currentSemesterRegistrationStatus?.status === 'ENDED') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semester is already ${currentSemesterRegistrationStatus.status}`,
    )
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
}
