const {reviewsPut} = require('../services')

const put = async (req, res) => {
  let {reviewId} = req.params
  let {comment, rating, recipeId, userId} = req.body
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
    await reviewsPut.put(reviewId, comment, rating, recipeId, userId)
    res.status(201).send()
  } catch (e) {
    console.log('reviewsPut controller Error')
    console.log(e.message)
    res.status(500).send()
  }
}

module.exports = {
  put,
}
