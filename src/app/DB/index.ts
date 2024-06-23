import config from '../config'
import { USER_ROLE } from '../modules/user/user.constant'

const superUser = {
  id: '0001',
  email: 'engineer.zakir.hossain@gmail.com',
  password: config.super_admin_password,
  needsToChangePassword: false,
  role: USER_ROLE.superAdmin,
  status: 'in-progress',
  isDeleted: false,
}

const seedSuperAdmin = () => {
  // When database is connected then check if there any super admin
}
