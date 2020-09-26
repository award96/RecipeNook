const {usersPost} = require('../services')

const post = async (req, res) => {
  let {username, email} = req.body
  try {
    let insertId = await usersPost.post(username, email)
    res.status(201).send(insertId.toString())
  } catch (e) {
    console.log('usersPost controller Error')
    console.log(e.message)
    res.status(500).send()
  }
}

module.exports = {
  post,
}
