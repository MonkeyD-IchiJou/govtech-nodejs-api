import { ParameterizedContext } from 'koa'
import { IRouterParamContext } from 'koa-router'
import Joi from 'joi'
import mysql from 'mysql2/promise'

const schema = Joi.object({
  teacher: [Joi.string().email({ minDomainSegments: 2 }).required(), Joi.array().items(Joi.string().email({ minDomainSegments: 2 })).required()]
})

function getCommonStudentsSqlString(numOfTeachers: number) {
  let sqlstring = 'SELECT email FROM students WHERE id IN ( SELECT t0.studentID FROM registrations t0 INNER JOIN registrations t1 ON t0.studentID = t1.studentID '

  for (let i = 2; i < numOfTeachers; ++i) {
    sqlstring += `INNER JOIN registrations t${i} ON t0.studentID = t${i}.studentID `
  }

  sqlstring += 'WHERE t0.teacherID IN ( SELECT id FROM teachers WHERE email = ? ) AND t1.teacherID IN ( SELECT id FROM teachers WHERE email = ? ) '

  for (let i = 2; i < numOfTeachers; ++i) {
    sqlstring += `AND t${i}.teacherID IN ( SELECT id FROM teachers WHERE email = ? ) `
  }

  return sqlstring + ')'
}

export default async (ctx: ParameterizedContext<any, IRouterParamContext<any, {}>>) => {
  let con: mysql.Connection | undefined

  try {
    // create the connection to database
    con = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'govtech_school',
      password: '1234567'
    })

    const teacher = ctx.query.teacher
    await schema.validateAsync({ teacher })

    let commonStudentsQuery: any

    if (Array.isArray(teacher)) {
      commonStudentsQuery = await con.query(
        getCommonStudentsSqlString(teacher.length),
        [...teacher]
      )
    } else {
      commonStudentsQuery = await con.query(
        'SELECT email FROM students WHERE id IN ( SELECT studentID FROM registrations WHERE teacherID IN ( SELECT id FROM teachers WHERE email = ? ) )',
        [teacher]
      )
    }

    ctx.status = 200
    ctx.body = { students: commonStudentsQuery[0].map((commonStudent: any) => commonStudent.email) }
  } catch (err) {
    ctx.status = err.status || 404
    ctx.body = { message: err.message }
  }

  if (con) {
    await con.end()
  }
}