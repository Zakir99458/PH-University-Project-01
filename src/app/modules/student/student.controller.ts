import { NextFunction, Request, RequestHandler, Response } from 'express'
import { StudentServices } from './student.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
// import { error } from 'console'

const catchAync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch((err) => next(err))
}

const getAllStudents = catchAync(async (req, res, next) => {
  const result = await StudentServices.getAllStudentsFromDB()

  res.status(200).json({
    success: true,
    message: 'Student retrievd successfully',
    date: result,
  })
})

const getSinglStudents = catchAync(async (req, res, next) => {
  const { studentId } = req.params

  const result = await StudentServices.getSingleStudentsFromDB(studentId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student retrievd successfully',
    data: result,
  })
})

const deleteStudents: RequestHandler = catchAync(async (req, res, next) => {
  const { studentId } = req.params

  const result = await StudentServices.deleteStudentFromDB(studentId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student deleted successfully',
    data: result,
  })
})

export const StudentController = {
  getAllStudents,
  getSinglStudents,
  deleteStudents,
}
