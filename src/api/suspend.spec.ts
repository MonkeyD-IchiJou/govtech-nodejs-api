import * as dotenv from "dotenv"
import RegisterAPI from './register'
import SuspendAPI from './suspend'
import DeleteAPI from './delete'

dotenv.config()

describe('Suspend student', () => {
  it("Will not success if pass in invalid email address", async () => {
    const ctx: any = {
      request: {
        body: {
          student: 's1ssp@gmail.kek'
        }
      }
    }

    try {
      await SuspendAPI(ctx)
    } catch (e) {
      console.log(e)
    }

    if (ctx.body?.message) {
      console.log(ctx.body.message)
    }

    expect(ctx.status).toBe(404)
  })

  it("Test suspending a student that not yet registered", async () => {
    const ctx: any = {
      request: {
        body: {
          student: 's2ssp@gmail.com'
        }
      }
    }

    try {
      await SuspendAPI(ctx)
    } catch (e) {
      console.log(e)
    }

    if (ctx.body?.message) {
      console.log(ctx.body.message)
    }

    expect(ctx.status).toBe(204)
  })

  it("teacher 1 should be able to register a students", async () => {
    const ctx: any = {
      request: {
        body: {
          teacher: 't1ssp@gmail.com',
          students: ['s1ssp@gmail.com']
        }
      }
    }

    try {
      await RegisterAPI(ctx)
    } catch (e) {
      console.log(e)
    }

    if (ctx.body?.message) {
      console.log(ctx.body.message)
    }

    expect(ctx.status).toBe(204)
  })

  it("Test suspending a student", async () => {
    const ctx: any = {
      request: {
        body: {
          student: 's1ssp@gmail.com'
        }
      }
    }

    try {
      await SuspendAPI(ctx)
    } catch (e) {
      console.log(e)
    }

    if (ctx.body?.message) {
      console.log(ctx.body.message)
    }

    expect(ctx.status).toBe(204)
  })

  it("clean up", async () => {
    const ctx: any = {
      request: {
        body: {
          teachers: ['t1ssp@gmail.com'],
          students: [
            "s1ssp@gmail.com"
          ]
        }
      }
    }

    try {
      await DeleteAPI(ctx)
    } catch (e) {
      console.log(e)
    }

    if (ctx.body?.message) {
      console.log(ctx.body.message)
    }

    expect(ctx.status).toBe(204)
  })
})