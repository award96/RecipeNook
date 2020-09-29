const {recipesPut} = require('../services')

const put = async (req, res, next) => {
  let {id, title, tagline, img, ingredients, directions, userId} = req.body
  let authId = res.locals.authId
  if (authId !== userId) {
    console.log("user authentication failed recipesPut.controller")
    console.log("typeof authId")
    console.log(typeof authId)
    console.log("typeof userId")
    console.log(typeof userId)
    res.status(403).send('Forbidden') && next({status: 403, message: 'Forbidden'})
    return
  }
  try {
    await recipesPut.put(id, title, tagline, img)
    res.locals = {recipeId: id, ingredients, directions}
    return next()
  } catch (e) {
    console.log('recipesPut controller Error')
    console.log(e.message)
    res.status(500).send() && next(e)
  }
}

module.exports = {
  put,
}
