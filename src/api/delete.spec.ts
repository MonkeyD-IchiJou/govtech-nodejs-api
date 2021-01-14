/**
 * Tests /api/delete
 *
 * @group unit
 */

import * as dotenv from "dotenv"
import DeleteAPI from './delete'

dotenv.config()

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