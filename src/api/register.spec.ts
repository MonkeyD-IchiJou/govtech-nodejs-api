import CommonStudentAPI from './commonstudents'

describe('teacher registering students testing', () => {
  it("teacher 1 should be able to register a students", async () => {
    const ctx: any = {
      request: {
        body: {
          teacher: 't1register@gmail.com',
          students: ['s1register@gmail.com']
        }
      },
      status: 500
    }

    try {
      await CommonStudentAPI(ctx)
    } catch (e) {
      console.log(e)
    }

    expect(ctx.status).toBe(204)
  })

  it("teacher 1 should not be able to register same student again", async () => {
    const ctx: any = {
      request: {
        body: {
          teacher: 't1register@gmail.com',
          students: ['s1register@gmail.com']
        }
      },
      status: 500
    }

    try {
      await CommonStudentAPI(ctx)
    } catch (e) {
      console.log(e)
    }

    expect(ctx.status).toBe(404)
  })

  it("teacher 1 should be able to register multiple students", async () => {
    const ctx: any = {
      request: {
        body: {
          teacher: 't1register@gmail.com',
          students: ['s2register@gmail.com', 's3register@gmail.com']
        }
      },
      status: 500
    }

    try {
      await CommonStudentAPI(ctx)
    } catch (e) {
      console.log(e)
    }

    expect(ctx.status).toBe(204)
  })

  it("teacher 1 should be able to register multiple (more than 2) students", async () => {
    const ctx: any = {
      request: {
        body: {
          teacher: 't1register@gmail.com',
          students: ['s4register@gmail.com', 's5register@gmail.com', 's6register@gmail.com', 's7register@gmail.com']
        }
      },
      status: 500
    }

    try {
      await CommonStudentAPI(ctx)
    } catch (e) {
      console.log(e)
    }

    expect(ctx.status).toBe(204)
  })

  it("Able to get all students registered by this teacher 1", async () => {

  })

  it("teacher 2 should be able to register multiple students", async () => {
    const ctx: any = {
      request: {
        body: {
          teacher: 't2register@gmail.com',
          students: ['s1register@gmail.com', 's2register@gmail.com', 's3register@gmail.com']
        }
      },
      status: 500
    }

    try {
      await CommonStudentAPI(ctx)
    } catch (e) {
      console.log(e)
    }

    expect(ctx.status).toBe(204)
  })

  it("Able to get all students registered by this teacher 2", async () => { })

  it("clean up teacher 1 and its students", async () => { })

  it("clean up teacher 2 and its students", async () => { })
})