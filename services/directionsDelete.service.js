const {directionsDelete} = require('../db')

const del = async (recipeId) => {
  try {
    await directionsDelete.del(recipeId)
  } catch (e) {
    throw new Error(e.message)
  }
}

module.exports = {
  del,
}
