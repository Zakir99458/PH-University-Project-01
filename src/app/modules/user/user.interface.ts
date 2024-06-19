import { USER_ROLE } from './user.constant'

export type TUser = {
  id: string
  email: string
  password: string
  needsToChangePassword: boolean
  passwordChangedAt?: Date
  role: 'admin' | 'student' | 'faculty'
  status: 'in-progress' | 'blocked'
  isDeleted: boolean
}

export type TUseRole = keyof typeof USER_ROLE
