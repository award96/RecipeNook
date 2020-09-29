const {reviewsPost} = require('../services')

const post = async (req, res, next) => {
  let {comment, rating, userId, recipeId, recipeUserId} = req.body
  let {authId} = res.locals
  if (authId !== userId) {
    console.log("user authentication failed recipesPost.controller")
    console.log("typeof authId")
    console.log(typeof authId)
    console.log("typeof userId")
    console.log(typeof userId)
    res.status(403).send('Forbidden') && next({status: 403, message: 'Forbidden'})
    return
  }
  try {
    let jsonResp = await reviewsPost.post(recipeId, userId, rating, comment)
    res.locals = {recipeUserId, recipeId, userId}
    res.status(200).send({insertId: jsonResp.insertId})
    return next()
  } catch (e) {
    console.log('reviewsPost controller Error')
    console.log(e.message)
    res.status(500).send() && next(error)
  }
}

module.exports = {
  post,
}
