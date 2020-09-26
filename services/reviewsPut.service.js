const {reviewsPut} = require('../db')

const put = async (reviewId, comment, rating, recipeId, userId) => {
  if (!(comment || rating)) {
    // ensure not totally null
    throw new Error('Incomplete Request - reviewsPut.service')
  }
  try {
    if (rating) {
      // prevents user from rating same recipe multiple times
      await reviewsPut.clean(recipeId, userId)
    }
    await reviewsPut.put(reviewId, comment, rating)
  } catch (e) {
    throw new Error(e.message)
  }
}

module.exports = {
  put,
}
