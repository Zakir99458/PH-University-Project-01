import express from 'express'
import { UserControllers } from './user.controller'
import { studentValidations } from '../student/student.validation'
import validateRequest from '../../middlewares/validateRequest'
import auth from '../../middlewares/auth'
import { USER_ROLE } from './user.constant'
import { createAdminValidationSchema } from '../Admin/admin.validation'

const router = express.Router()

router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  validateRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
)

// router.post(
//   '/create-faculty',
//   auth(USER_ROLE.admin),
//   validateRequest(createFacultyValidationSchema),
//   UserControllers.createFaculty,
// );

router.post(
  '/create-admin',
  // auth(USER_ROLE.admin),
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin,
)

export const UserRoute = router
