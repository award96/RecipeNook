let dateProcessing = (resultArray) => {
  try {
    if (resultArray) {
      resultArray.forEach((comment) => {
        let dateTime = new Date(comment.posted)
        dateTime.setHours(dateTime.getHours() - 7)

        let options = {
          timeZone: 'America/Los_Angeles',
          weekday: 'short',
          hour: '2-digit',
          day: 'numeric',
          month: 'numeric',
          year: '2-digit',
        }

        let dateTimeString = dateTime.toLocaleString('en-US', options)
        comment.posted = dateTimeString
      })
    }
    return resultArray
  } catch (e) {
    throw new Error(e.message)
  }
}

module.exports = dateProcessing
