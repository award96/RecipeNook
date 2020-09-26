const {ingredientsDelete} = require('../db')

const del = async (recipeId) => {
  try {
    await ingredientsDelete.del(recipeId)
  } catch (e) {
    throw new Error(e.message)
  }
}

module.exports = {
  del,
}
