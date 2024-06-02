import express from 'express'
import { StudentController } from './student.controller'

const router = express.Router()

// Call controller function

router.get('/', StudentController.getAllStudents)
router.get('/:studentId', StudentController.getSinglStudents)
router.delete('/:studentId', StudentController.deleteStudents)

export const StudentRoute = router
