const {usersAuth} = require('../services')
const {admin} = require('../server')

const auth = async (req, res, next) => {

  let {authToken} = req.body
  try {
    let decodedToken = await admin.auth().verifyIdToken(authToken)
    let uid = decodedToken.uid
    let authId = await usersAuth.auth(uid)
    res.locals.authId= authId
    next()
  } catch (e) {
    console.log('usersAuth controller Error')
    console.log(e.message)
    res.status(403).send(e.message)
  }
}

module.exports = {
  auth,
}
