import express from 'express'
import { EnrolledCourseValidations } from './enrolledCourse.validation'
import { EnrolledCourseControllers } from './enrolledCourse.controller'
import validateRequest from '../../middlewares/validateRequest'

const router = express.Router()

router.post(
  '/create-course',
  validateRequest(
    EnrolledCourseValidations.createEnrolledCourseValidationZodSchema,
  ),
  EnrolledCourseControllers.createEnrolledCourse,
)

export const EnrolledCourseRoutes = router
