const {ingredientsPost} = require('../db')

const post = async (recipeId, ingredients) => {
  // require complete recipe
  if (!ingredients) {
    throw new Error('incomplete request')
  }
  try {
    await ingredientsPost.post(recipeId, ingredients)
    return
  } catch (e) {
    throw new Error(e.message)
  }
}

module.exports = {
  post,
}
