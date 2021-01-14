import * as dotenv from "dotenv";
import Koa from 'koa'
import Router from 'koa-router'
import BodyParser from 'koa-bodyparser'
import RegisterApi from './api/register'
import CommonStudentApi from './api/commonstudents'
import SuspendApi from './api/suspend'
import RetrieveForNotificationsApi from './api/retrievefornotifications'
import DeleteApi from './api/delete'

dotenv.config()

const app = new Koa()
const router = new Router()

app.use(BodyParser())

router.post('/api/register', RegisterApi)

router.get('/api/commonstudents', CommonStudentApi)

router.post('/api/suspend', SuspendApi)

router.post('/api/retrievefornotifications', RetrieveForNotificationsApi)

// extra, for testing purpose
router.delete('/api/delete', DeleteApi)

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
  console.log("Server started")
})
