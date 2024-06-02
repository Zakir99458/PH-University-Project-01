import { object } from 'zod'
import config from '../../config'
import { TStudent } from '../student/student.interface'
import { NewUser } from './user.interface'
import { User } from './user.model'

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  //   if (await student.isUserExists(studentData.id)) {
  //     throw new Error('User already exists')
  //   }
  const user: NewUser = {}
  // Checking: if password is not given
  user.password = password || (config.default_password as string)
  // Set the role
  user.role = 'student'
  // Set ID for student, embedded
  user.id = '2030100001'
  // create user
  const result = await User.create(user)
  // create student
  if (Object.keys(result).length) {
    studentData.id = result.id
    studentData.user = result._id
  }
  return result
}

export const UserServices = {
  createStudentIntoDB,
}
