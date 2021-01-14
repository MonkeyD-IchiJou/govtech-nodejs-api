import { ParameterizedContext } from 'koa'
import { IRouterParamContext } from 'koa-router'
import Joi from 'joi'
import mysql from 'mysql2/promise'
import getEmailsFromNotification from '../helpers/getEmailsFromNotification'

const schema = Joi.object({
  teacher: Joi.string().email({ minDomainSegments: 2 }).required(),
  notification: Joi.string().required()
})

const schemaStudents = Joi.object({
  students: Joi.array().items(Joi.string().email({ minDomainSegments: 2 }))
})

export default async (ctx: ParameterizedContext<any, IRouterParamContext<any, {}>>) => {
  let con: mysql.Connection | undefined

  try {
    // create the connection to database
    con = await mysql.createConnection({
      host: process.env.GT_DB_HOST,
      user: process.env.GT_DB_USR,
      database: process.env.GT_DB_NAME,
      password: process.env.GT_DB_PW
    })

    const { teacher, notification } = ctx.request.body
    await schema.validateAsync({ teacher, notification })

    const studentEmails = getEmailsFromNotification(notification)
    await schemaStudents.validateAsync({ students: studentEmails })

    let notificationSqlString = ''
    studentEmails.forEach((student) => {
      notificationSqlString += `OR email = '${student}' `
    })

    const notificationStudentEmailQuery: any = await con.query(
      `SELECT email FROM students WHERE ( id IN ( SELECT studentID FROM registrations WHERE teacherID IN (SELECT id FROM teachers WHERE email = ?)) ${notificationSqlString}) AND suspend = false ORDER BY email`,
      [teacher, 'kek@gmail.com']
    )

    ctx.status = 200
    ctx.body = { recipients: notificationStudentEmailQuery[0].map((obj: any) => obj.email) }
  } catch (err) {
    ctx.status = err.status || 404
    ctx.body = { message: err.message }
  }

  if (con) {
    await con.end()
  }
}