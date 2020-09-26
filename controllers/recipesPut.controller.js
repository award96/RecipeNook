const {recipesPut} = require('../services')

const put = async (req, res, next) => {
  let {id, title, tagline, img, ingredients, directions} = req.body
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
