const {directionsPost} = require('../services')

const post = async (req, res, next) => {
  let {directions, recipeId} = res.locals
  try {
    await directionsPost.post(recipeId, directions)
    res.status(201).send()
    return next()
  } catch (e) {
    console.log('directionsPost controller Error')
    console.log(e.message)
    res.status(500).send() && next(e)
  }
}

module.exports = {
  post,
}
