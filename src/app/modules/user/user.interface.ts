export type TUser = {
  id: string
  password: string
  needsToChangePassword: boolean
  role: 'admin' | 'student' | 'faculty'
  status: 'in-progress' | 'blocked'
  isDeleted: boolean
}
