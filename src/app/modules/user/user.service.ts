import config from '../../config'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { TUser } from './user.interface'
import { User } from './user.model'

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  //   if (await student.isUserExists(studentData.id)) {
  //     throw new Error('User already exists')
  //   }
  const userData: Partial<TUser> = {}
  // Checking: if password is not given
  userData.password = password || (config.default_password as string)
  // Set the role
  userData.role = 'student'
  // Set ID for student, embedded
  userData.id = '2030100001'
  // create user
  const newUser = await User.create(userData)

  // create student
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id // embedding ID
    studentData.user = newUser._id // Reference ID
    const newStudent = Student.create(studentData)
    return newStudent
  }
}

export const UserServices = {
  createStudentIntoDB,
}
