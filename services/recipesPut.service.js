const {recipesPut} = require('../db')

const put = async (recipeId, title, tagline, img) => {
  // require complete recipe
  if (!(recipeId && title && tagline && img)) {
    throw new Error('Incomplete request - recipesPut.service')
  }
  try {
    await recipesPut.put(recipeId, title, tagline, img)
  } catch (e) {
    throw new Error(e.message)
  }
}

module.exports = {
  put,
}
