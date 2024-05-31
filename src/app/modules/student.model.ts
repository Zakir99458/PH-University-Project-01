import { Schema, model } from 'mongoose'
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  TStudentMethods,
  TStudentModel,
  TUserName,
} from './student.interface'
import { string } from 'zod'
import bcrypt from 'bcrypt'
import config from '../config'

// creating Schema
const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String, // Corrected typo from 'tyep' to 'type'
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
})

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNumber: {
    type: String, // Corrected typo from 'fatherContactNumbrer' to 'fatherContactNumber'
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNumber: {
    type: String, // Corrected typo from 'motherContactNumbrer' to 'motherContactNumber'
    required: true,
  },
})

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
})

const studentSchema = new Schema<TStudent, TStudentModel, TStudentMethods>({
  id: { type: String },
  password: {
    type: String,
    required: [true, 'Password is required...'],
  },
  name: {
    type: userNameSchema,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female'], // Correctly define enum
    required: true,
  },
  dateOfBirth: { type: String },
  email: { type: String, required: true },
  contactNumber: { type: String, required: true },
  emergencyContactNumber: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], // Correctly define enum
    required: true,
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profileImage: { type: String },
  isActive: {
    type: String,
    enum: ['active', 'blocked'], // Correctly define enum
    required: true,
    default: 'active',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
})

// Pre and Post Middleware
studentSchema.pre('save', async function (next) {
  // console.log(this, 'We are going to save the data...')
  const user = this
  // use bcrypt to has the password
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  )
  next()
})

//  Here doc is the current document and next calling the next middleware
studentSchema.post('save', function (doc, next) {
  console.log(this.password, '...Data saved....')

  next()
})

studentSchema.post('save', function (doc, next) {
  console.log(
    this.password,
    '...Data saved....but will not send password field to the client side..',
  )

  doc.password = ''
  next()
})

// Query Middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
  // console.log(this)
})

// Instance

studentSchema.methods.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id })

  return existingUser
}
// Now creating model
export const Student = model<TStudent, TStudentModel>('Student', studentSchema)
