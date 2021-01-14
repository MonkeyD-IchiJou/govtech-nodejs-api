/**
 * 
 * @param {number} i - the current index at first @ in the notification string
 * @param {string} notification - notification text string
 */
function getStudentEmail(i: number, notification: string) {
  let studentEmail = ''

  for (let j = i + 1; j < notification.length; j++) {
    if (notification.charAt(j) === '\n' || notification.charAt(j) === ' ') {
      return { j, studentEmail }
    }

    studentEmail += notification.charAt(j)

    if (j + 1 >= notification.length) {
      return { j, studentEmail }
    }
  }

  return { j: notification.length - 1, studentEmail }
}

/**
 * To get a list of email which get @ mentioning in the notification
 * @param {string} notification - notification text string
 * @returns {Array[string]}
 */
function getEmailsFromNotification(notification: string) {
  const studentEmails = []

  for (let i = 0; i < notification.length; i++) {
    if (notification.charAt(i) === '@') {
      const res = getStudentEmail(i, notification)

      i = res?.j
      studentEmails.push(res?.studentEmail)
    }
  }

  return studentEmails
}

export default getEmailsFromNotification