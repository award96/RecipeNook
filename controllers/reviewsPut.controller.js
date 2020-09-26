const {reviewsPut} = require('../services')

const put = async (req, res) => {
  let {reviewId} = req.params
  let {comment, rating, recipeId, userId} = req.body
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
