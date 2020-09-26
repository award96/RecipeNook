const {notifPost} = require('../db')

const postRecipe = async (recipeId, userId, followersArray) => {
  try {
    await notifPost.postRecipe(recipeId, userId, followersArray)
    return
  } catch (e) {
    throw new Error(e.message)
  }
}

const postReview = async (recipeId, userId, recipeUserId) => {
  try {
    await notifPost.postReview(recipeId, userId, recipeUserId)
    return
  } catch (e) {
    throw new Error(e.message)
  }
}

const postFavorite = async (recipeId, userId, recipeUserId) => {
  try {
    await notifPost.postFavorite(recipeId, userId, recipeUserId)
    return
  } catch (e) {
    throw new Error(e.message)
  }
}

const postFollow = async (followerId, userId) => {
  try {
    await notifPost.postFollow(followerId, userId)
    return
  } catch (e) {
    throw new Error(e.message)
  }
}

module.exports = {
  postRecipe,
  postReview,
  postFavorite,
  postFollow,
}
