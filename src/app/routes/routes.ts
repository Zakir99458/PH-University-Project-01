import { Router } from 'express'
import { StudentRoute } from '../modules/student/student.route'
import { UserRoute } from '../modules/user/user.route'

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
]

moduleRoutes.forEach((router) => routes.use(router.path, router.route))
export default routes
