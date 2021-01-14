/**
 * Tests integrations
 *
 * @group integration
 */
import * as dotenv from "dotenv"
import axios from 'axios'

dotenv.config()

const url = 'https://8o4zbsskqi.execute-api.ap-southeast-1.amazonaws.com'

describe('Integrations testing with public URL', () => {
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
          teacher: 't1public@gmail.com',
          students: ['s1public@gmail.com']
        }
      )
    } catch (e) {
      res = e
    }

    expect(res.status).toBe(204)
  })

  it("teacher 1 should be able to register a students", async () => {
    let res = undefined

    try {
      res = await axios.post(
        url + "/api/register",
        {
          teacher: 't1public@gmail.com',
          students: ['s1public@gmail.com']
        }
      )
    } catch (e) {
      res = e
    }

    expect(res.response.status).toBe(404)
  })

  it("teacher 1 should be able to register a students", async () => {
    let res = undefined

    try {
      res = await axios.post(
        url + "/api/register",
        {
          teacher: 't1public@gmail.com',
          students: ['s2public@gmail.com', 's3public@gmail.com']
        }
      )
    } catch (e) {
      res = e
    }

    expect(res.status).toBe(204)
  })

  it("teacher 1 should be able to register multiple (more than 2) students", async () => {
    let res = undefined

    try {
      res = await axios.post(
        url + "/api/register",
        {
          teacher: 't1public@gmail.com',
          students: ['s4public@gmail.com', 's5public@gmail.com', 's6public@gmail.com', 's7public@gmail.com']
        }
      )
    } catch (e) {
      res = e
    }

    expect(res.status).toBe(204)
  })

  it("Able to get all students registered by this teacher 1", async () => {
    let res = undefined

    try {
      res = await axios.get(
        url + "/api/commonstudents?teacher=t1public@gmail.com"
      )
    } catch (e) {
      res = e
      console.log(res.response.data)
    }

    expect(res.status).toBe(200)
    expect(res.data.students.sort()).toEqual([
      "s1public@gmail.com",
      "s2public@gmail.com",
      "s3public@gmail.com",
      "s4public@gmail.com",
      "s5public@gmail.com",
      "s6public@gmail.com",
      "s7public@gmail.com"
    ].sort())
  })

  it("teacher 2 should be able to register students", async () => {
    let res = undefined

    try {
      res = await axios.post(
        url + "/api/register",
        {
          teacher: 't2public@gmail.com',
          students: ['s2public@gmail.com', 's4public@gmail.com', 's6public@gmail.com']
        }
      )
    } catch (e) {
      res = e
    }

    expect(res.status).toBe(204)
  })

  it("teacher 3 should be able to register students", async () => {
    let res = undefined

    try {
      res = await axios.post(
        url + "/api/register",
        {
          teacher: 't3public@gmail.com',
          students: ['s1public@gmail.com', 's3public@gmail.com', 's5public@gmail.com', 's6public@gmail.com']
        }
      )
    } catch (e) {
      res = e
    }

    expect(res.status).toBe(204)
  })

  it("Test returning teacher 1 and 2 common students", async () => {
    let res = undefined

    try {
      res = await axios.get(
        url + "/api/commonstudents?teacher=t1public@gmail.com&teacher=t2public@gmail.com"
      )
    } catch (e) {
      res = e
      console.log(res.response.data)
    }

    expect(res.status).toBe(200)
    expect(res.data.students.sort()).toEqual([
      "s2public@gmail.com",
      "s4public@gmail.com",
      "s6public@gmail.com"
    ].sort())
  })

  it("Test returning teacher 1, 2, 3 common students", async () => {
    let res = undefined

    try {
      res = await axios.get(
        url + "/api/commonstudents?teacher=t1public@gmail.com&teacher=t2public@gmail.com&teacher=t3public@gmail.com"
      )
    } catch (e) {
      res = e
      console.log(res.response.data)
    }

    expect(res.status).toBe(200)
    expect(res.data.students.sort()).toEqual([
      "s6public@gmail.com"
    ].sort())
  })

  it("Test suspending a student", async () => {
    let res = undefined

    try {
      res = await axios.post(
        url + "/api/suspend",
        {
          student: 's1public@gmail.com'
        }
      )
    } catch (e) {
      res = e
    }

    expect(res.status).toBe(204)
  })

  it("Able to get all students registered by this teacher 1 after suspending", async () => {
    let res = undefined

    try {
      res = await axios.get(
        url + "/api/commonstudents?teacher=t1public@gmail.com"
      )
    } catch (e) {
      res = e
      console.log(res.response.data)
    }

    expect(res.status).toBe(200)
    expect(res.data.students.sort()).toEqual([
      "s1public@gmail.com",
      "s2public@gmail.com",
      "s3public@gmail.com",
      "s4public@gmail.com",
      "s5public@gmail.com",
      "s6public@gmail.com",
      "s7public@gmail.com"
    ].sort())
  })

  it("Test retrieving notifications after suspending a student", async () => {
    let res = undefined

    try {
      res = await axios.post(
        url + "/api/retrievefornotifications",
        {
          teacher: 't1public@gmail.com',
          notification: 'someone is suspended @s2public@gmail.com @s2public@gmail.com'
        }
      )
    } catch (e) {
      res = e
    }

    expect(res.status).toBe(200)
    expect(res.data.recipients.sort()).toEqual([
      "s2public@gmail.com",
      "s3public@gmail.com",
      "s4public@gmail.com",
      "s5public@gmail.com",
      "s6public@gmail.com",
      "s7public@gmail.com"
    ])
  })

  it("Test retrieving notifications after suspending a student with other teacher", async () => {
    let res = undefined

    try {
      res = await axios.post(
        url + "/api/retrievefornotifications",
        {
          teacher: 't2public@gmail.com',
          notification: '@s1public@gmail.com someone is suspended @s7public@gmail.com'
        }
      )
    } catch (e) {
      res = e
    }

    expect(res.status).toBe(200)
    expect(res.data.recipients.sort()).toEqual([
      "s2public@gmail.com",
      "s4public@gmail.com",
      "s6public@gmail.com",
      "s7public@gmail.com"
    ])
  })

  it("clean up teachers and its students", async () => {
    let res = undefined

    try {
      res = await axios.delete(
        url + "/api/delete",
        {
          data: {
            teachers: ['t1public@gmail.com', 't2public@gmail.com', 't3public@gmail.com'],
            students: [
              "s1public@gmail.com",
              "s2public@gmail.com",
              "s3public@gmail.com",
              "s4public@gmail.com",
              "s5public@gmail.com",
              "s6public@gmail.com",
              "s7public@gmail.com"
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