const {notifPut} = require('../db')

const wasRead = async (notifIdArray) => {
  if (!notifIdArray || notifIdArray.length === 0) {
    return
  }
  try {
    await notifPut.wasRead(notifIdArray)
  } catch (e) {
    throw new Error(e.message)
  }
}

module.exports = {
  wasRead,
}
