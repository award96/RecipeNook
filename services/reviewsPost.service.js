const {reviewsPost, reviewsPut} = require('../db')

const post = async (recipeId, userId, rating, comment) => {
  // required for a review
  if (!(recipeId && userId)) {
    throw new Error('incomplete request - reviewsPost.service')
  }
  try {
    if (rating) {
      // prevents user from rating same recipe multiple times
      await reviewsPut.clean(recipeId, userId)
    }
    let resp = await reviewsPost.post(recipeId, userId, rating, comment)
    let respObj = JSON.parse(JSON.stringify(resp))
    return respObj
  } catch (e) {
    throw new Error(e.message)
  }
}

module.exports = {
  post,
}
