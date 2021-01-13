import DeleteAPI from './delete'

describe('deletion', () => {
  it("cleaning up fail", async () => {
    const ctx: any = {
      request: {
        body: {
          students: []
        }
      }
    }

    try {
      await DeleteAPI(ctx)
    } catch (e) {
      console.log(e)
    }

    expect(ctx.status).toBe(404)
  })
})