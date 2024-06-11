import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { SemesterRegistrationValidation } from './semesterRegistration.valication'
import { SemesterRegistrationControllers } from './semesterRegistration.controller'

const router = express.Router()

router.post(
  '/create-semester-registration',
  validateRequest(
    SemesterRegistrationValidation.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationControllers.createSemesterRegistration,
)

// router.get('/', AcademicFacultyControllers.getAllAcademicFaculty)

// router.get('/:facultyId', AcademicFacultyControllers.getSingleAcademicFaculty)

// router.patch(
//   '/:facultyId',
//   validateRequest(
//     AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
//   ),
//   AcademicFacultyControllers.updateAcademicFaculty,
// )

export const SemesterRegistrationRoutes = router
