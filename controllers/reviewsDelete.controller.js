const {reviewsDelete} = require('../services')

const del = async (req, res) => {
  let {reviewId} = req.params
  try {
    await reviewsDelete.del(reviewId)
    res.status(201).send()
  } catch (e) {
    console.log('reviewsDelete.del controller Error')
    console.log(e.message)
    res.status(500).send()
  }
}

const delRecipe = async (req, res, next) => {
  let {recipeId} = res.locals
  try {
    await reviewsDelete.delRecipe(recipeId)
    next()
  } catch (e) {
    console.log('reviewsDelete.delRecipe controller Error')
    console.log(e.message)
    res.status(500).send() && next(e)
  }
}

module.exports = {
  del,
  delRecipe,
}
