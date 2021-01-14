import * as dotenv from "dotenv"
import CommonStudentAPI from './commonstudents'
import RegisterAPI from './register'
import DeleteAPI from './delete'

dotenv.config()

describe('Get students that registered to ALL of the given teachers', () => {
  it("Will not success if pass in invalid email address", async () => {
    const ctx: any = { query: { teacher: 'notemail' } }

    try {
      await CommonStudentAPI(ctx)
    } catch (e) {
      console.log(e)
    }

    if (ctx.body?.message) {
      console.log(ctx.body.message)
    }

    expect(ctx.status).toBe(404)
  })

  it("Will not success if pass in invalid email address in teachers list", async () => {
    const ctx: any = { query: { teacher: ['t1cs@gmail.com', 'notemail'] } }

    try {
      await CommonStudentAPI(ctx)
    } catch (e) {
      console.log(e)
    }

    if (ctx.body?.message) {
      console.log(ctx.body.message)
    }

    expect(ctx.status).toBe(404)
  })

  it("Preparation: teacher 1 should be able to register multiple students", async () => {
    const ctx: any = {
      request: {
        body: {
          teacher: 't1cs@gmail.com',
          students: ['s1cs@gmail.com', 's2cs@gmail.com', 's3cs@gmail.com']
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

  it("Preparation: teacher 2 should be able to register multiple students", async () => {
    const ctx: any = {
      request: {
        body: {
          teacher: 't2cs@gmail.com',
          students: ['s2cs@gmail.com', 's3cs@gmail.com', 's4cs@gmail.com',]
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

  it("Preparation: teacher 3 should be able to register multiple students", async () => {
    const ctx: any = {
      request: {
        body: {
          teacher: 't3cs@gmail.com',
          students: ['s1cs@gmail.com', 's4cs@gmail.com', 's5cs@gmail.com']
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

  it("Preparation: teacher 4 should be able to register multiple students", async () => {
    const ctx: any = {
      request: {
        body: {
          teacher: 't4cs@gmail.com',
          students: ['s5cs@gmail.com', 's6cs@gmail.com']
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

  it("Preparation: teacher 5 should be able to register multiple students", async () => {
    const ctx: any = {
      request: {
        body: {
          teacher: 't5cs@gmail.com',
          students: ['s7cs@gmail.com', 's8cs@gmail.com', 's2cs@gmail.com', 's3cs@gmail.com']
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

  it("Test returning teacher 1 and 2 common students", async () => {
    const ctx: any = { query: { teacher: ['t1cs@gmail.com', 't2cs@gmail.com'] } }

    try {
      await CommonStudentAPI(ctx)
    } catch (e) {
      console.log(e)
    }

    if (ctx.body?.message) {
      console.log(ctx.body.message)
    }

    expect(ctx.status).toBe(200)
    expect(ctx.body.students.sort()).toEqual(['s2cs@gmail.com', 's3cs@gmail.com'].sort())
  })

  it("Test returning teacher 2 and 3 common students", async () => {
    const ctx: any = { query: { teacher: ['t2cs@gmail.com', 't3cs@gmail.com'] } }

    try {
      await CommonStudentAPI(ctx)
    } catch (e) {
      console.log(e)
    }

    if (ctx.body?.message) {
      console.log(ctx.body.message)
    }

    expect(ctx.status).toBe(200)
    expect(ctx.body.students.sort()).toEqual(['s4cs@gmail.com'])
  })

  it("Test returning teacher 1 and 3 common students", async () => {
    const ctx: any = { query: { teacher: ['t1cs@gmail.com', 't3cs@gmail.com'] } }

    try {
      await CommonStudentAPI(ctx)
    } catch (e) {
      console.log(e)
    }

    if (ctx.body?.message) {
      console.log(ctx.body.message)
    }

    expect(ctx.status).toBe(200)
    expect(ctx.body.students.sort()).toEqual(['s1cs@gmail.com'])
  })

  it("Test returning teacher 1, 4, 5 common students", async () => {
    const ctx: any = { query: { teacher: ['t1cs@gmail.com', 't4cs@gmail.com', 't5cs@gmail.com'] } }

    try {
      await CommonStudentAPI(ctx)
    } catch (e) {
      console.log(e)
    }

    if (ctx.body?.message) {
      console.log(ctx.body.message)
    }

    expect(ctx.status).toBe(200)
    expect(ctx.body.students).toEqual([])
  })

  it("Test returning teacher 5, 2, 1 common students", async () => {
    const ctx: any = { query: { teacher: ['t5cs@gmail.com', 't2cs@gmail.com', 't1cs@gmail.com'] } }

    try {
      await CommonStudentAPI(ctx)
    } catch (e) {
      console.log(e)
    }

    if (ctx.body?.message) {
      console.log(ctx.body.message)
    }

    expect(ctx.status).toBe(200)
    expect(ctx.body.students.sort()).toEqual(['s2cs@gmail.com', 's3cs@gmail.com'].sort())
  })

  it("clean up teachers and students", async () => {
    const ctx: any = {
      request: {
        body: {
          teachers: ['t1cs@gmail.com', 't2cs@gmail.com', 't3cs@gmail.com', 't4cs@gmail.com', 't5cs@gmail.com'],
          students: [
            "s1cs@gmail.com",
            "s2cs@gmail.com",
            "s3cs@gmail.com",
            "s4cs@gmail.com",
            "s5cs@gmail.com",
            "s6cs@gmail.com",
            "s7cs@gmail.com",
            "s8cs@gmail.com"
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