const {reviewsGet} = require('../services')

const all = async (req, res) => {
  let {recipeId} = req.params
  try {
    let reviews = await reviewsGet.all(recipeId)
    res.status(200).send(reviews)
  } catch (e) {
    console.log('reviewsGet controller Error')
    console.log(e.message)
    res.status(500).send()
  }
}

module.exports = {
  all,
}
