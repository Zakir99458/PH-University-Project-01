import { StudentServices } from './student.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAync from '../../utils/catchAsync'

const getAllStudents = catchAync(async (req, res) => {
  // console.log(req.query)
  const result = await StudentServices.getAllStudentsFromDB(req.query)

  res.status(200).json({
    success: true,
    message: 'Student retrievd successfully',
    date: result,
  })
})

const getSinglStudents = catchAync(async (req, res) => {
  const { id } = req.params

  const result = await StudentServices.getSingleStudentsFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student retrievd successfully',
    data: result,
  })
})

const updateStudents = catchAync(async (req, res) => {
  const { id } = req.params
  const { student } = req.body

  const result = await StudentServices.updateStudentsIntoDB(id, student)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student updated successfully',
    data: result,
  })
})

const deleteStudents = catchAync(async (req, res) => {
  const { id } = req.params

  const result = await StudentServices.deleteStudentFromDB(id)

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
  updateStudents,
}
