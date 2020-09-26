const {directionsPost} = require('../db')

const post = async (recipeId, directions) => {
  // require complete recipe
  if (!directions) {
    throw new Error('incomplete request - directionsPost.service')
  }
  try {
    await directionsPost.post(recipeId, directions)
    return
  } catch (e) {
    throw new Error(e.message)
  }
}

module.exports = {
  post,
}
