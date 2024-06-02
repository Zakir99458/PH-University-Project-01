/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
// const express = require('express')
import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { StudentRoute } from './app/modules/student/student.route'
import { UserRoute } from './app/modules/user/user.route'
import { error } from 'console'
import globalErrorHandler from './app/middlewares/globalErrorHandlers'

const app: Application = express()

app.use(express.json())
app.use(cors())

// Application routes
app.use('/api/v1/students', StudentRoute)
app.use('/api/v1/users', UserRoute)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.use(globalErrorHandler)

export default app
