import { TAcademicSemester } from '../academicSemester/academicSemester.interface'
import { User } from './user.model'

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1, //For filering
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean() // to make query faster

  return lastStudent?.id ? lastStudent.id.substring(6) : undefined
}

// Create student id:  year + Semester code + 4 digit number
export const generateStudentId = async (payload: TAcademicSemester) => {
  let currentID = (0).toString()

  // 2030010001
  const lastStudentId = await findLastStudentId()
  const lastSemesterCode = lastStudentId?.substring(4, 6)
  const lastSemesterYear = lastStudentId?.substring(0, 4)
  const currentSemesterCode = payload.code
  const currentYear = payload.year

  if (
    lastStudentId &&
    lastSemesterCode === currentSemesterCode &&
    lastSemesterYear === currentYear
  ) {
    currentID = lastStudentId.substring(6)
  }

  let incrementId = (Number(currentID) + 1).toString().padStart(4, '0')
  incrementId = `${payload.year}${payload.code}${incrementId}`
  return incrementId
}
