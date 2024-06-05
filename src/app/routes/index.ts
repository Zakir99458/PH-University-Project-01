import { Router } from 'express'
import { StudentRoute } from '../modules/student/student.route'
import { UserRoute } from '../modules/user/user.route'
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.routes'
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.routes'

const routes = Router()

// routes.use('/students', StudentRoute)
// routes.use('/users', UserRoute)

const moduleRoutes = [
  {
    path: '/students',
    route: StudentRoute,
  },
  {
    path: '/users',
    route: UserRoute,
  },
  {
    path: '/academic-semester',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculty',
    route: AcademicFacultyRoutes,
  },
]

moduleRoutes.forEach((router) => routes.use(router.path, router.route))
export default routes
