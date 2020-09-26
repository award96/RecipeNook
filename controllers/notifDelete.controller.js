const {notifDelete} = require('../services')

const del = async (req, res, next) => {
  let {recipeId} = req.params
  res.locals.recipeId = recipeId
  try {
    await notifDelete.del(recipeId)
    return next()
  } catch (e) {
    console.log('notifDelete controller Error')
    console.log(e.message)
    res.status(500).send() && next(e)
  }
}

module.exports = {
  del,
}
