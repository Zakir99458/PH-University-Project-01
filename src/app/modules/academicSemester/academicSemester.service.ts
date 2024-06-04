import { AcademicSemester } from './academiSemester.model'
import { academicSemesterNameCodeMapper } from './academicSemester.constant'
import { TAcademicSemester } from './academicSemester.interface'

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  // Semester name --> Semester code mapping

  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Code - Name Mapping !!')
  }
  const result = await AcademicSemester.create(payload)

  return result
}

const getAllAcademicSemesterFromDB = async () => {
  const result = await AcademicSemester.find()

  return result
}

const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemester.findById(id)

  return result
}

const udateAcademicSemesterIntoDB = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.code &&
    payload.name &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('Invalid Semester Code..')
  }
  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  getSingleAcademicSemesterFromDB,
  udateAcademicSemesterIntoDB,
}
