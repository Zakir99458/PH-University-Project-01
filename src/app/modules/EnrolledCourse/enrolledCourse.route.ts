import express from 'express'
import { EnrolledCourseValidations } from './enrolledCourse.validation'
import { EnrolledCourseControllers } from './enrolledCourse.controller'
import validateRequest from '../../middlewares/validateRequest'
import auth from '../../middlewares/auth'

const router = express.Router()

router.post(
  '/create-enrolled-course',
  auth('student'),
  validateRequest(
    EnrolledCourseValidations.createEnrolledCourseValidationZodSchema,
  ),
  EnrolledCourseControllers.createEnrolledCourse,
)

export const EnrolledCourseRoutes = router
