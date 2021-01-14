import { ParameterizedContext } from 'koa'
import { IRouterParamContext } from 'koa-router'
import Joi from 'joi'
import mysql from 'mysql2/promise'

const schema = Joi.object({
  teacher: Joi.string().email({ minDomainSegments: 2 }).required(),
  students: Joi.array().items(Joi.string().email({ minDomainSegments: 2 })).required()
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

    const { teacher, students } = ctx.request.body
    await schema.validateAsync({ teacher, students })

    const NEW_UUID_IN_BIN = { toSqlString: () => 'UUID_TO_BIN(UUID())' }

    // create a new entry for this teacher email, if not existed
    await con.query(
      'INSERT INTO teachers(id, email) VALUES ? ON DUPLICATE KEY UPDATE email=email',
      [[[NEW_UUID_IN_BIN, teacher]]]
    )

    // create a new entry for these students, if not existed
    await con.query(
      'INSERT INTO students(id, email) VALUES ? ON DUPLICATE KEY UPDATE email=email',
      [students.map((student: string) => [NEW_UUID_IN_BIN, student])]
    )

    // register all the students under this teacher
    await con.query(
      'INSERT INTO registrations(id, teacherID, studentID) VALUES ?',
      [
        students.map((student: string) => [
          NEW_UUID_IN_BIN,
          { toSqlString: () => `(SELECT id FROM teachers WHERE email = '${teacher}')` },
          { toSqlString: () => `(SELECT id FROM students WHERE email = '${student}')` }
        ])
      ]
    )

    // done querying
    ctx.status = 204
  } catch (err) {
    ctx.status = err.status || 404
    ctx.body = { message: err.message }
  }

  if (con) {
    await con.end()
  }
}