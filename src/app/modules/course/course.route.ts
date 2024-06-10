import express from 'express'
import { CoursesControllers } from './course.controller'
import validateRequest from '../../middlewares/validateRequest'
import { CourseValidations } from './course.validation'

const router = express.Router()

router.post(
  '/create-course',
  validateRequest(CourseValidations.createCourseValidationSchema),
  CoursesControllers.createCourse,
)

router.get('/', CoursesControllers.getAllCourses)

router.get('/:id', CoursesControllers.getSingleCourses)

router.delete('/:id', CoursesControllers.deleteCourses)

router.patch(
  '/:id',
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CoursesControllers.updateCourses,
)

export const CourseRoutes = router
