import { Router } from 'express'
import { StudentRoute } from '../modules/student/student.route'
import { UserRoute } from '../modules/user/user.route'
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.routes'
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.routes'
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes'
import { AdminRoutes } from '../modules/Admin/admin.route'
import { FacultyRoutes } from '../modules/faculty/faculty.route'
import { CourseRoutes } from '../modules/course/course.route'
import { SemesterRegistrationRoutes } from '../modules/semesterRegistration/semesterRegistration.route'
import { offeredCourseRoutes } from '../modules/offeredCourse/offeredCourse.route'
import { AuthRoutes } from '../modules/Auth/auth.route'
import { EnrolledCourseRoutes } from '../modules/EnrolledCourse/enrolledCourse.route'

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
    path: '/admins',
    route: UserRoute,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/academic-semester',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculty',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
  {
    path: '/semester-registration',
    route: SemesterRegistrationRoutes,
  },
  {
    path: '/offered-courses',
    route: offeredCourseRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes.authRouter,
  },
  {
    path: '/enrolled-course',
    route: EnrolledCourseRoutes,
  },
]

moduleRoutes.forEach((router) => routes.use(router.path, router.route))
export default routes
