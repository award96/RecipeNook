const {favoritesDelete} = require('../services')

const del = async (req, res, next) => {
  let {recipeId} = res.locals
  try {
    await favoritesDelete.del(recipeId)
    return next()
  } catch (e) {
    console.log('favoritesDelete controller Error')
    console.log(e.message)
    res.status(500).send() && next(e)
  }
}

module.exports = {
  del,
}
