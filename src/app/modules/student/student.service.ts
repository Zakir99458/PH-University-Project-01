import mongoose from 'mongoose'
import { Student } from './student.model'
import AppError from '../../errors/AppErrors'
import httpStatus from 'http-status'
import { User } from '../user/user.model'

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
  return result
}

const getSingleStudentsFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
  return result
}

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    const deleteStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    )
    if (!deleteStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Unable to delete Student')
    }

    const deleteUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    )
    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Unable to delete User')
    }
    await session.commitTransaction()
    await session.endSession()
    return deleteStudent
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete!!')
  }
}

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentsFromDB,
  deleteStudentFromDB,
}
