import { ParameterizedContext } from 'koa'
import { IRouterParamContext } from 'koa-router'
import Joi from 'joi'
import mysql from 'mysql2/promise'

const schema = Joi.object({
  teacher: Joi.string().email({ minDomainSegments: 2 }).required(),
  notification: Joi.string().required()
})

const schemaStudents = Joi.object({
  students: Joi.array().items(Joi.string().email({ minDomainSegments: 2 }))
})

/**
 * 
 * @param {number} i - the current index at first @ in the notification string
 * @param {string} notification - notification text string
 */
function getStudentEmail(i: number, notification: string) {
  let studentEmail = ''

  for (let j = i + 1; j < notification.length; j++) {
    if (notification.charAt(j) === '\n' || notification.charAt(j) === ' ') {
      return { j, studentEmail }
    }

    studentEmail += notification.charAt(j)

    if (j + 1 >= notification.length) {
      return { j, studentEmail }
    }
  }

  return { j: notification.length - 1, studentEmail }
}

/**
 * To get a list of email which get @ mentioning in the notification
 * @param {string} notification - notification text string
 * @returns {Array[string]}
 */
function getStudentEmails(notification: string) {
  const studentEmails = []

  for (let i = 0; i < notification.length; i++) {
    if (notification.charAt(i) === '@') {
      const res = getStudentEmail(i, notification)

      i = res?.j
      studentEmails.push(res?.studentEmail)
    }
  }

  return studentEmails
}

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

    const studentEmails = getStudentEmails(notification)
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