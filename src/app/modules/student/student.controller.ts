import { NextFunction, Request, Response } from 'express'
import { StudentServices } from './student.service'
// import { error } from 'console'

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB()

    res.status(200).json({
      success: true,
      message: 'Student retrievd successfully',
      date: result,
    })
  } catch (err) {
    next(err)
  }
}

const getSinglStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params

    const result = await StudentServices.getSingleStudentsFromDB(studentId)

    res.status(200).json({
      success: true,
      message: 'Student retrievd successfully',
      date: result,
    })
  } catch (err) {
    next(err)
  }
}

const deleteStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params

    const result = await StudentServices.deleteStudentFromDB(studentId)

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      date: result,
    })
  } catch (err) {
    next(err)
  }
}

export const StudentController = {
  getAllStudents,
  getSinglStudents,
  deleteStudents,
}
