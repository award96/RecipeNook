const {recipesPost} = require('../services')

const post = async (req, res, next) => {
  let {title, tagline, img, userId, ingredients, directions} = req.body
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
    let recipeId = await recipesPost.post(title, tagline, img, userId)
    res.locals = {
      recipeId,
      userId,
      ingredients,
      directions,
    }
    return next()
  } catch (e) {
    console.log('recipesPost controller Error')
    console.log(e.message)
    res.status(500).send() && next(e)
  }
}

module.exports = {
  post,
}
