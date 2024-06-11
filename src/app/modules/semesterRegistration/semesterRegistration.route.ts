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

router.get('/', SemesterRegistrationControllers.getAllSemesterRegistrations)

router.get('/:id', SemesterRegistrationControllers.getSinglSemesterRegistration)

router.patch(
  '/:id',
  validateRequest(
    SemesterRegistrationValidation.updateSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationControllers.updateSemesterRegistration,
)

export const SemesterRegistrationRoutes = router
