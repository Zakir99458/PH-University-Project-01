import nodemailer from 'nodemailer'
import config from '../config'

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com.',
    port: 587,
    secure: config.node_env === 'production', // Use `true` for port 465, `false` for all other ports
    auth: {
      user: 'engineer.zakir.hossain@gmail.com',
      pass: 'zedy lmjk ckhd oczm',
    },
  })

  await transporter.sendMail({
    from: 'engineer.zakir.hossain@gmail.com', // sender address
    to, // list of receivers
    subject: 'Password change request', // Subject line
    text: 'Hello world?', // plain text body
    html, // html body
  })
}
