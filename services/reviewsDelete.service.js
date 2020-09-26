const {reviewsDelete} = require('../db')

const del = async (reviewId) => {
  try {
    await reviewsDelete.del(reviewId)
  } catch (e) {
    throw new Error(e.message)
  }
}

const delRecipe = async (recipeId) => {
  try {
    await reviewsDelete.delRecipe(recipeId)
  } catch (e) {
    throw new Error(e.message)
  }
}

module.exports = {
  del,
  delRecipe,
}
