const {usersAuth} = require('../db')

const auth = async (uid) => {

  try {
    let resp = await usersAuth.auth(uid)
    let respObj = JSON.parse(JSON.stringify(resp))
    let authId = respObj[0].id
    return authId
  } catch (e) {
    throw new Error(e.message)
  }
}

module.exports = {
  auth
}
