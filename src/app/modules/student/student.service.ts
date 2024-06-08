import mongoose from 'mongoose'
import { Student } from './student.model'
import AppError from '../../errors/AppErrors'
import httpStatus from 'http-status'
import { User } from '../user/user.model'
import { TStudent } from './student.interface'
import QueryBuilder from '../../builder/QueryBuilder'
import { studentSearchableFields } from './student.constant'

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // console.log('Base-Query', query)
  // // {'name.firstName':{$regex:query.searchTerm, $options:1}}
  // const studentSearchableFields = ['email', 'name.firstName', 'presentAddress']

  // let searchTerm = ''
  // const queryObj = { ...query }
  // const excludeObj = ['searchTerm', 'sort', 'limit', 'page', 'fields']
  // excludeObj.forEach((el) => delete queryObj[el])

  // console.log('QueryObject', queryObj)

  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string
  // }

  // const searchQuery = Student.find({
  //   $or: studentSearchableFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // })

  // const filterQuery = searchQuery.find(queryObj)

  // let sort = '-createdAt'
  // if (query.sort) {
  //   sort = query.sort as string
  // }
  // const sortQuery = filterQuery.sort(sort)

  // let page = 1
  // let limit = 1
  // let skip = 0
  // if (query.limit) {
  //   limit = Number(query.limit)
  // }
  // const limitQuery = sortQuery.limit(limit)

  // if (query.page) {
  //   page = Number(query.page)
  //   skip = (page - 1) * limit
  // }
  // const paginate = limitQuery.skip(skip)

  // let fields = '-__v'

  // if (query.fields) {
  //   fields = (query.fields as string).split(',').join(' ')
  // }
  // const fieldsQuery = await paginate.select(fields)
  // console.log('fieldsQuery:', fieldsQuery)
  // return fieldsQuery

  const stduentQuery = new QueryBuilder(Student.find(), query)
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()
  const result = stduentQuery.modelQuery

  return result
}

const getSingleStudentsFromDB = async (id: string) => {
  const result = await Student.findOne({ id })

  return result
}

const updateStudentsIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, ...remainingStudentData } = payload

  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingStudentData,
  }
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdateData[`guardian.${key}`] = value
    }
  }
  // if(email){
  //   modifiedUpdateData[`ema`]
  // }
  console.log(modifiedUpdateData)
  const result = await Student.findOneAndUpdate({ id }, modifiedUpdateData, {
    new: true,
    runValidators: true,
  })
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
  updateStudentsIntoDB,
}
