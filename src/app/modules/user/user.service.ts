import mongoose from 'mongoose'
import config from '../../config'
import { AcademicSemester } from '../academicSemester/academiSemester.model'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { TUser } from './user.interface'
import { User } from './user.model'
import { generateStudentId } from './user.utils'
import AppError from '../../errors/AppErrors'
import httpStatus from 'http-status'

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  //   if (await student.isUserExists(studentData.id)) {
  //     throw new Error('User already exists')
  //   }
  const userData: Partial<TUser> = {}
  // Checking: if password is not given
  userData.password = password || (config.default_password as string)
  // Set the role
  userData.role = 'student'

  //  For Generate ID
  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  )

  const session = await mongoose.startSession()

  try {
    ;(await session).startTransaction()
    // Set ID for student, embedded
    userData.id = await generateStudentId(admissionSemester)
    // create user
    const newUser = await User.create([userData], { session })

    // create student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Unable to create new user!')
    }
    payload.id = newUser[0].id // embedding ID
    payload.user = newUser[0]._id // Reference ID
    const newStudent = Student.create([payload], { session })
    if (!(await newStudent).length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Unable to create new student')
    }

    ;(await session).commitTransaction()
    ;(await session).endSession()

    return newStudent
  } catch (err) {
    ;(await session).abortTransaction()
    ;(await session).endSession()
    throw new AppError(httpStatus.BAD_REQUEST, 'Unable Do the Transaction')
  }
}

export const UserServices = {
  createStudentIntoDB,
}
