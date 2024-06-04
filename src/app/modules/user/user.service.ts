import config from '../../config'
import { AcademicSemester } from '../academicSemester/academiSemester.model'
import { TAcademicSemester } from '../academicSemester/academicSemester.interface'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { TUser } from './user.interface'
import { User } from './user.model'

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  //   if (await student.isUserExists(studentData.id)) {
  //     throw new Error('User already exists')
  //   }
  const userData: Partial<TUser> = {}
  // Checking: if password is not given
  userData.password = password || (config.default_password as string)
  // Set the role
  userData.role = 'student'

  // Create student id: Semester year + term + 4 digit number
  const generateStudentId = (payload: TAcademicSemester) => {}

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  )

  // Set ID for student, embedded
  userData.id = generateStudentId(admissionSemester)
  // create user
  const newUser = await User.create(userData)

  // create student
  if (Object.keys(newUser).length) {
    payload.id = newUser.id // embedding ID
    payload.user = newUser._id // Reference ID
    const newStudent = Student.create(payload)
    return newStudent
  }
}

export const UserServices = {
  createStudentIntoDB,
}
