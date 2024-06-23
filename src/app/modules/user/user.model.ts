import { Schema, model } from 'mongoose'
import { TUser } from './user.interface'
import config from '../../config'
import bcrypt from 'bcrypt'

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      // select: 0, // it will not allow to send password to the client side
    },
    needsToChangePassword: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: ['super-admin', 'admin', 'student', 'faculty'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

// Pre and Post Middleware
userSchema.pre('save', async function (next) {
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
userSchema.post('save', function (doc, next) {
  console.log(this.password, '...Data saved....')

  next()
})

userSchema.post('save', function (doc, next) {
  console.log(
    this.password,
    '...Data saved....but will not send password field to the client side..',
  )

  doc.password = ''
  next()
})

export const User = model<TUser>('User', userSchema)
