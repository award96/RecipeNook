const {ingredientsPost} = require('../services')

const post = async (req, res, next) => {
  let {recipeId, ingredients} = res.locals
  try {
    await ingredientsPost.post(recipeId, ingredients)
    return next()
  } catch (e) {
    console.log('ingredientsPost controller Error')
    console.log(e.message)
    res.status(500).send() && next(e)
  }
}

module.exports = {
  post,
}
