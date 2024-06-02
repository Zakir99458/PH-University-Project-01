import { NextFunction, Request, RequestHandler, Response } from 'express'
import { UserServices } from './user.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'

const createStudent: RequestHandler = async (req, res, next) => {
  try {
    const { password, student: studentData } = req.body
    // Using/ importing Zod validation data
    // const zodParseData = studentValidationSchema.parse(studentData)

    const result = await UserServices.createStudentIntoDB(password, studentData)

    // res.status(200).json({
    //   success: true,
    //   message: 'Student created successfully',
    //   data: result,
    // })

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student created successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const UserControllers = {
  createStudent,
}
