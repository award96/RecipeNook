const {usersDelete} = require('../services')

const del = async (req, res) => {
  let {userId} = req.params
  try {
    await usersDelete.del(userId)
    res.status(201).send()
  } catch (e) {
    console.log('usersDelete controller Error')
    console.log(e.message)
    res.status(500).send()
  }
}

module.exports = {
  del,
}
