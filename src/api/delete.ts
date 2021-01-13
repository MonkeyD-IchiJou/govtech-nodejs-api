import { ParameterizedContext } from 'koa'
import { IRouterParamContext } from 'koa-router'
import Joi from 'joi'
import mysql from 'mysql2/promise'

const schema = Joi.object({
  teachers: Joi.array().items(Joi.string().email({ minDomainSegments: 2 })).required(),
  students: Joi.array().items(Joi.string().email({ minDomainSegments: 2 })).required()
})

export default async (ctx: ParameterizedContext<any, IRouterParamContext<any, {}>>) => {
  let con: mysql.Connection | undefined

  try {
    // create the connection to database
    con = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'govtech_school',
      password: '1234567'
    });

    const { teachers, students } = ctx.request.body
    await schema.validateAsync({ teachers, students })

    for (let i = 0; i < teachers.length; ++i) {
      // delete registrations for this teacher first
      await con.query(
        'DELETE FROM registrations WHERE teacherID IN (SELECT id FROM teachers WHERE email=?)',
        [teachers[i]]
      )

      // then delete the teacher entry from teachers table
      await con.query(
        'DELETE FROM teachers WHERE email=?',
        [teachers[i]]
      )
    }

    for (let i = 0; i < students.length; ++i) {
      // delete the student entry from students table
      await con.query(
        'DELETE FROM students WHERE email=?',
        [students[i]]
      )
    }

    ctx.status = 204
  } catch (err) {
    ctx.status = err.status || 404
    ctx.body = { message: err.message }
  }

  if (con) {
    await con.end()
  }
}