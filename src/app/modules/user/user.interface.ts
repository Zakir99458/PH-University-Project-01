import { USER_ROLE } from './user.constant'

export type TUser = {
  id: string
  password: string
  needsToChangePassword: boolean
  role: 'admin' | 'student' | 'faculty'
  status: 'in-progress' | 'blocked'
  isDeleted: boolean
}

export type TUseRole = keyof typeof USER_ROLE
