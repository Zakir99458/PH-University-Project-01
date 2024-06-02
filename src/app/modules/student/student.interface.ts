// import { model } from 'mongoose'

import { Model, Types } from 'mongoose'

export type TGuardian = {
  fatherName: string
  fatherOccupation: string
  fatherContactNumber: string
  motherName: string
  motherOccupation: string
  motherContactNumber: string
}

export type TUserName = {
  firstName: string
  middleName?: string
  lastName: string
}

export type TLocalGuardian = {
  name: string
  occupation: string
  contactNo: string
  address: string
}

export type TStudent = {
  id: string
  user: Types.ObjectId
  password: string
  name: TUserName
  gender: 'male' | 'female'
  dateOfBirth?: string
  email: string
  contactNumber: string
  emergencyContactNumber: string
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  guardian: TGuardian
  presentAddress: string
  permanentAddress: string
  localGuardian: TLocalGuardian
  profileImage?: string
  isDeleted: boolean
}

// Instance method
export type TStudentMethods = {
  isUserExists(id: string): Promise<TStudent | null>
}

export type TStudentModel = Model<
  TStudent,
  Record<string, never>,
  TStudentMethods
>
