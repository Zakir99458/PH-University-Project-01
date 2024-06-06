import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicDepartmentValidation } from './academicDepartment.validation'
import { AcademicDepartmentControllers } from './academicDepartment.controllers'

const router = express.Router()

router.post(
  '/create-academic-faculty',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.createAcademicDepartment,
)

router.get('/', AcademicDepartmentControllers.getAllAcademicFaculty)

router.get(
  '/:facultyId',
  AcademicDepartmentControllers.getSingleAcademicFaculty,
)

router.patch(
  '/:facultyId',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.updateAcademicFaculty,
)

export const AcademicDepartmentRoutes = router
