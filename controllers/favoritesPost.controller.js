const {favoritesPost} = require('../services')

const post = async (req, res, next) => {
  let {recipeId} = req.params
  let {userId, recipeUserId} = req.body
  try {
    let shouldSendNotif = await favoritesPost.post(userId, recipeId)
    if (shouldSendNotif) {
      res.locals = {userId, recipeId, recipeUserId}
    }
    res.status(201).send()
    return next()
  } catch (e) {
    console.log('favoritesPost controller Error')
    console.log(e.message)
    res.status(500).send() && next(e)
  }
}

module.exports = {
  post,
}
