/**
 * Tests getEmailFromNotification function
 *
 * @group unit
 */

import getEmailsFromNotification from "./getEmailsFromNotification"

describe('Test getEmailFromNotification helper function', () => {
  it("shld get a list of emails from notification", () => {
    expect(getEmailsFromNotification('hello everybody @t1@gmail.com @t2@gmail.com')).toEqual(['t1@gmail.com', 't2@gmail.com'])
    expect(getEmailsFromNotification('Hello students! @studentagnes@gmail.com @studentmiche@gmail.com')).toEqual(['studentagnes@gmail.com', 'studentmiche@gmail.com'])
    expect(getEmailsFromNotification('@studentagnes@gmail.com Hello students! @studentmiche@gmail.com')).toEqual(['studentagnes@gmail.com', 'studentmiche@gmail.com'])
  })
})