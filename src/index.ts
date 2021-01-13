import Koa from 'koa'
import Router from 'koa-router'
import BodyParser from 'koa-bodyparser'
import RegisterAPI from './api/register'
import CommonStudentAPI from './api/commonstudents'
import SuspendApi from './api/suspend'
import RetrieveForNotificationsApi from './api/retrievefornotifications'

const app = new Koa()
const router = new Router()

app.use(BodyParser())

router.post('/api/register', RegisterAPI)

router.get('/api/commonstudents', CommonStudentAPI)

router.post('/api/suspend', SuspendApi)

router.post('/api/retrievefornotifications', RetrieveForNotificationsApi)

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
  console.log("Server started")
})
