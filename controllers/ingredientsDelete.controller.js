const {ingredientsDelete} = require('../services')

const del = async (req, res, next) => {
  let {recipeId} = res.locals
  try {
    await ingredientsDelete.del(recipeId)
    return next()
  } catch (e) {
    console.log('ingredientsDelete controller Error')
    console.log(e.message)
    res.status(500).send() && next(e)
  }
}

module.exports = {
  del,
}
