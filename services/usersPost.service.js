const {usersPost} = require('../db')

const post = async (username, email) => {
  // no null fields
  if (!(username && email)) {
    throw new Error('incomplete request - usersPost.service')
  }
  try {
    let response = await usersPost.post(username, email)
    let respObj = JSON.parse(JSON.stringify(response))
    return respObj.insertId
  } catch (e) {
    throw new Error(e.message)
  }
}

module.exports = {
  post,
}
