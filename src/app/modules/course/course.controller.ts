import httpStatus from 'http-status'
import catchAync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { CourseServices } from './course.service'

const createCourse = catchAync(async (req, res) => {
  //   const { password, student: studentData } = req.body

  const result = await CourseServices.createCourseIntoDB(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is created successfully',
    data: result,
  })
})

const getAllCourses = catchAync(async (req, res) => {
  const result = await CourseServices.getAllCoursesFromDB()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Courses are retrieved successfully',
    data: result,
  })
})
const getSingleCourses = catchAync(async (req, res) => {
  const { id } = req.params

  const result = await CourseServices.getSingleCourseFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'The Course is retrieved successfully',
    data: result,
  })
})

// const updateAcademicFaculty = catchAync(async (req, res) => {
//   const { facultyId } = req.params

//   const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(
//     facultyId,
//     req.body,
//   )

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Academic Faculty is updated successfully',
//     data: result,
//   })
// })
const deleteCourses = catchAync(async (req, res) => {
  const { id } = req.params

  const result = await CourseServices.deleteCourseIntoDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'The course is deleted successfully',
    data: result,
  })
})

export const CoursesControllers = {
  createCourse,
  getAllCourses,
  getSingleCourses,
  deleteCourses,
}
