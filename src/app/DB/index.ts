import config from '../config'
import { USER_ROLE } from '../modules/user/user.constant'
import { User } from '../modules/user/user.model'

const superUser = {
  id: '0001',
  email: 'engineer.zakir.hossain@gmail.com',
  password: config.super_admin_password,
  needsToChangePassword: false,
  role: USER_ROLE.superAdmin,
  status: 'in-progress',
  isDeleted: false,
}

const seedSuperAdmin = async () => {
  // When database is connected then check if there any super admin
  const isSuperAdminExists = await User.findOne({ role: USER_ROLE.superAdmin })
  if (!isSuperAdminExists) {
    await User.create(superUser)
  }
}
export default seedSuperAdmin
