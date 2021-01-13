import { ParameterizedContext } from 'koa'
import { IRouterParamContext } from 'koa-router'
import Joi from 'joi'
import mysql from 'mysql2/promise'

const schema = Joi.object({
  student: Joi.string().email({ minDomainSegments: 2 }).required()
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

    const { student } = ctx.request.body
    await schema.validateAsync({ student })

    await con.query(
      'UPDATE students SET suspend=? WHERE email=?',
      [true, student]
    )

    ctx.status = 204
  } catch (err) {
    ctx.status = err.status || 404
    ctx.body = { message: err.message }
  }

  if (con) {
    await con.end()
  }
}