const {directionsDelete} = require('../services')

const del = async (req, res, next) => {
  let {recipeId} = res.locals
  try {
    await directionsDelete.del(recipeId)
    return next()
  } catch (e) {
    console.log('directionsDelete controller Error')
    console.log(e.message)
    res.status(500).send() && next(e)
  }
}

module.exports = {
  del,
}
