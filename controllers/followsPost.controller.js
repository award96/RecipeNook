const {followsPost} = require('../services')

const post = async (req, res, next) => {
  let {userId} = req.params // user who is being followed
  let {followerId} = req.body // user who clicked follow
  try {
    let shouldSendNotif = await followsPost.post(userId, followerId)
    if (shouldSendNotif) {
      res.locals = {userId, followerId}
    }
    res.status(201).send()
    return next()
  } catch (e) {
    console.log('followsPost controller Error')
    console.log(e.message)
    res.status(500).send() && next(e)
  }
}

module.exports = {
  post,
}
