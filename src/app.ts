/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
// const express = require('express')
import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandlers'
import notFoundRoute from './app/middlewares/notFound'
import routes from './app/routes'

const app: Application = express()

app.use(express.json())
app.use(cors())

// For testing purpose
// const test = async (req: Request, res: Response) => {
//   // Promise.reject()
//   // res.send('Hello World!')
// }
// app.get('/', test)
// Application routes
app.use('/api/v1', routes)

// Global Error Handler Middlewares
app.use(globalErrorHandler)

// Not Found Route
app.use(notFoundRoute)

export default app
