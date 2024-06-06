import { Schema, model } from 'mongoose'
import { TAcademicDepartment } from './academicDepartment.interface'
import AppError from '../../errors/AppErrors'

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
  },
)

// Check for existence of Department
academicDepartmentSchema.pre('save', async function (next) {
  const isDepartmentExist = await AcademicDepartment.findOne({
    name: this.name,
  })
  if (isDepartmentExist) {
    throw new AppError(404, 'Department is already exists..')
  }

  next()
})

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery()
  const isDepartmentExist = await AcademicDepartment.findOne(query)

  if (!isDepartmentExist) {
    throw new AppError(404, 'Department does not exit')
  }
  next()
})

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
)
