const {recipesDelete} = require('../db')

const del = async (recipeId) => {
  try {
    await recipesDelete.del(recipeId)
  } catch (e) {
    throw new Error(e.message)
  }
}

module.exports = {
  del,
}
