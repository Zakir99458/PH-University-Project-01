import express from 'express'
import { StudentController } from './student.controller'
import validateRequest from '../../middlewares/validateRequest'
import { studentValidations } from './student.validation'

const router = express.Router()

// Call controller function

router.get('/', StudentController.getAllStudents)
router.get('/:studentId', StudentController.getSinglStudents)
router.patch(
  '/:studentId',
  validateRequest(studentValidations.updateStudentValidationSchema),
  StudentController.updateStudents,
)
router.delete('/:studentId', StudentController.deleteStudents)

export const StudentRoute = router
