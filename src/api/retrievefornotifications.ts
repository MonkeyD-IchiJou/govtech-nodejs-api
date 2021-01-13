import { ParameterizedContext } from 'koa'
import { IRouterParamContext } from 'koa-router'

export default async (ctx: ParameterizedContext<any, IRouterParamContext<any, {}>>) => {
  ctx.status = 200
}