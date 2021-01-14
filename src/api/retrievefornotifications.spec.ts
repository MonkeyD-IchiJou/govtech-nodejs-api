import * as dotenv from "dotenv"
import RegisterAPI from './register'
import RetrieveForNotificationsAPI from './retrievefornotifications'
import SuspendAPI from './suspend'
import DeleteAPI from './delete'

dotenv.config()

describe('teacher sending notifications to students', () => {
  it("Will not success if pass in invalid body obj", async () => {
    const ctx: any = {
      request: {
        body: {
          teacher: 't1rfn@gmail.com'
        }
      }
    }

    try {
      await RetrieveForNotificationsAPI(ctx)
    } catch (e) {
      console.log(e)
    }

    if (ctx.body?.message) {
      console.log(ctx.body.message)
    }

    expect(ctx.status).toBe(404)
  })

  it("Preparation: teacher 1 should be able to register students", async () => {
    const ctx: any = {
      request: {
        body: {
          teacher: 't1rfn@gmail.com',
          students: ['s1rfn@gmail.com', 's2rfn@gmail.com', 's3rfn@gmail.com']
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

  it("Preparation: teacher 2 should be able to register students", async () => {
    const ctx: any = {
      request: {
        body: {
          teacher: 't2rfn@gmail.com',
          students: ['s4rfn@gmail.com', 's5rfn@gmail.com']
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

  it("Test retrieving notifications", async () => {
    const ctx: any = {
      request: {
        body: {
          teacher: 't1rfn@gmail.com',
          notification: 'hello world'
        }
      }
    }

    try {
      await RetrieveForNotificationsAPI(ctx)
    } catch (e) {
      console.log(e)
    }

    if (ctx.body?.message) {
      console.log(ctx.body.message)
    }

    expect(ctx.status).toBe(200)
    expect(ctx.body.recipients).toEqual(['s1rfn@gmail.com', 's2rfn@gmail.com', 's3rfn@gmail.com'])
  })

  it("Test suspending a student", async () => {
    const ctx: any = {
      request: {
        body: {
          student: 's1rfn@gmail.com'
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

  it("Test retrieving notifications after suspending a student", async () => {
    const ctx: any = {
      request: {
        body: {
          teacher: 't1rfn@gmail.com',
          notification: 'hello world @s1rfn@gmail.com is suspended'
        }
      }
    }

    try {
      await RetrieveForNotificationsAPI(ctx)
    } catch (e) {
      console.log(e)
    }

    if (ctx.body?.message) {
      console.log(ctx.body.message)
    }

    expect(ctx.status).toBe(200)
    expect(ctx.body.recipients).toEqual(['s2rfn@gmail.com', 's3rfn@gmail.com'])
  })

  it("Test retrieving notifications with @", async () => {
    const ctx: any = {
      request: {
        body: {
          teacher: 't1rfn@gmail.com',
          notification: 'hello world @s4rfn@gmail.com'
        }
      }
    }

    try {
      await RetrieveForNotificationsAPI(ctx)
    } catch (e) {
      console.log(e)
    }

    if (ctx.body?.message) {
      console.log(ctx.body.message)
    }

    expect(ctx.status).toBe(200)
    expect(ctx.body.recipients).toEqual(['s2rfn@gmail.com', 's3rfn@gmail.com', 's4rfn@gmail.com'])
  })

  it("Test retrieving notifications with multiple @", async () => {
    const ctx: any = {
      request: {
        body: {
          teacher: 't1rfn@gmail.com',
          notification: 'hello @s4rfn@gmail.com world @s5rfn@gmail.com'
        }
      }
    }

    try {
      await RetrieveForNotificationsAPI(ctx)
    } catch (e) {
      console.log(e)
    }

    if (ctx.body?.message) {
      console.log(ctx.body.message)
    }

    expect(ctx.status).toBe(200)
    expect(ctx.body.recipients).toEqual(['s2rfn@gmail.com', 's3rfn@gmail.com', 's4rfn@gmail.com', 's5rfn@gmail.com'])
  })

  it("Test suspending a student again", async () => {
    const ctx: any = {
      request: {
        body: {
          student: 's4rfn@gmail.com'
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

  it("Test retrieving notifications with multiple @ after suspending", async () => {
    const ctx: any = {
      request: {
        body: {
          teacher: 't1rfn@gmail.com',
          notification: 'hello @s4rfn@gmail.com world @s5rfn@gmail.com'
        }
      }
    }

    try {
      await RetrieveForNotificationsAPI(ctx)
    } catch (e) {
      console.log(e)
    }

    if (ctx.body?.message) {
      console.log(ctx.body.message)
    }

    expect(ctx.status).toBe(200)
    expect(ctx.body.recipients).toEqual(['s2rfn@gmail.com', 's3rfn@gmail.com', 's5rfn@gmail.com'])
  })

  it("clean up", async () => {
    const ctx: any = {
      request: {
        body: {
          teachers: ['t1rfn@gmail.com', 't2rfn@gmail.com'],
          students: [
            's1rfn@gmail.com', 's2rfn@gmail.com', 's3rfn@gmail.com', 's4rfn@gmail.com', 's5rfn@gmail.com'
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