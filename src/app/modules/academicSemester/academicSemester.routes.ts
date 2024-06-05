import express from 'express'
import { AcademicSemesterControllers } from './academiSemester.controller'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicSemesterValidations } from './academicSemester.validation'

const router = express.Router()

router.post(
  '/create-academic-faculty',
  validateRequest(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
)

router.get('/:facultyId', AcademicSemesterControllers.getSingleAcademicSemester)

router.patch(
  '/:facultyId',
  validateRequest(
    AcademicSemesterValidations.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.updateAcademicSemester,
)

router.get('/', AcademicSemesterControllers.getAllAcademicSemester)

export const AcademicSemesterRoutes = router
