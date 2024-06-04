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

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
}
