/**
 * Tests integrations
 *
 * @group integration
 */
import * as dotenv from "dotenv"
import axios from 'axios'

dotenv.config()

const url = 'https://8o4zbsskqi.execute-api.ap-southeast-1.amazonaws.com'

describe('Integrations testing with URL', () => {
  it("Will not success if pass in invalid email address", async () => {
    let res = undefined

    try {
      res = await axios.get(
        url + "/api/commonstudents?teacher='notemail'"
      )
    } catch (e) {
      res = e
      console.log(res.response.data)
    }

    expect(res.response.status).toBe(404)
    expect(res.response.data.message).toBeDefined()
  })

  it("teacher 1 should be able to register a students", async () => {
    let res = undefined

    try {
      res = await axios.post(
        url + "/api/register",
        {
          teacher: 't1register@gmail.com',
          students: ['s1register@gmail.com']
        }
      )
    } catch (e) {
      res = e
    }

    expect(res.status).toBe(204)
  })

  it("clean up teacher 1 & 2 and its students", async () => {
    let res = undefined

    try {
      res = await axios.delete(
        url + "/api/delete",
        {
          data: {
            teachers: ['t1register@gmail.com', 't2register@gmail.com'],
            students: [
              "s1register@gmail.com",
              "s2register@gmail.com",
              "s3register@gmail.com",
              "s4register@gmail.com",
              "s5register@gmail.com",
              "s6register@gmail.com",
              "s7register@gmail.com"
            ]
          }
        }
      )
    } catch (e) {
      res = e
      console.log(res.response.data)
    }

    expect(res.status).toBe(204)
  })
})