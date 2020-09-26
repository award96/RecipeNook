const {recipesDelete} = require('../services')

const del = async (req, res) => {
  let {recipeId} = req.params
  try {
    await recipesDelete.del(recipeId)
    res.status(201).send()
  } catch (e) {
    console.log('recipesDelete controller Error')
    console.log(e.message)
    res.status(500).send()
  }
}

module.exports = {
  del,
}
