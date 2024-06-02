import { Schema, model } from 'mongoose'
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  TStudentMethods,
  TStudentModel,
  TUserName,
} from './student.interface'
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

const studentSchema = new Schema<TStudent, TStudentModel, TStudentMethods>(
  {
    id: { type: String },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User Id is required...'],
      unique: true,
      ref: 'User',
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
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },

  {
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  },
)

//  Virtul: to show full name to the user but it is not exist in the data base
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`
})

// Query Middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
  // console.log(this)
})

studentSchema.pre('findOne', function (next) {
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
