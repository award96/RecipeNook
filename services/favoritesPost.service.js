const {favoritesPost} = require('../db')

const post = async (userId, recipeId) => {
  try {
    let isFavorited = await favoritesPost.check(userId, recipeId)
    let isFavoritedArray = Object.values(
      JSON.parse(JSON.stringify(isFavorited)),
    )
    if (isFavoritedArray.length > 0) {
      // unfavorite
      await favoritesPost.unFavorite(isFavoritedArray[0].id)
      return false
    } else {
      // favorite
      await favoritesPost.favorite(userId, recipeId)
      return true
    }
  } catch (e) {
    throw new Error(e.message)
  }
}

module.exports = {
  post,
}
