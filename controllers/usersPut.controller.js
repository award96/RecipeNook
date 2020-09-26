const {usersPut} = require('../services')

const put = async (req, res) => {
  let {userId} = req.params
  let {type, value} = req.body
  try {
    await usersPut.put(userId, type, value)
    return res.status(201).send()
  } catch (e) {
    console.log('usersPut controller Error')
    console.log(e.message)
    res.status(500).send()
  }
}

module.exports = {
  put,
}
