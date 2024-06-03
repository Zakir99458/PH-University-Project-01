import { AcademicSemester } from './academiSemester.model'
import { TAcademicSemester } from './academicSemester.interface'

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  const result = await AcademicSemester.create(payload)

  return result
}

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
}
