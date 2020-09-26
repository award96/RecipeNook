const {favoritesDelete} = require('../db')

const del = async (recipeId) => {
  try {
    await favoritesDelete.del(recipeId)
  } catch (e) {
    throw new Error(e.message)
  }
}

module.exports = {
  del,
}
