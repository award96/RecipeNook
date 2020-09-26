const {notifPut} = require('../services')

const wasRead = async (req, res) => {
  let {notifIdArray} = req.body

  try {
    await notifPut.wasRead(notifIdArray)
    res.status(201).send()
  } catch (e) {
    console.log('notifPut controller Error')
    console.log(e.message)
    res.status(500).send()
  }
}

module.exports = {
  wasRead,
}
