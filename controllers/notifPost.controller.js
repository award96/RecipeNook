const {followers} = require('../db/usersGet.db')
const {notifPost} = require('../services')

const postRecipe = async (req, res) => {
  let {recipeId, userId, followersArray} = res.locals
  if (!followersArray || followersArray.length === 0) {
    return
  }
  try {
    await notifPost.postRecipe(recipeId, userId, followersArray)
    return
  } catch (e) {
    console.log('notifPost.postRecipe controller error')
    console.log(e.message)
  }
}

const postReview = async (req, res) => {
  let {recipeId, userId, recipeUserId} = res.locals
  if (userId === recipeUserId) {
    return // can't send notification to yourself
  }
  try {
    await notifPost.postReview(recipeId, userId, recipeUserId)
    return
  } catch (e) {
    console.log('notifPost.postReview controller error')
    console.log(e.message)
  }
}

const postFavorite = async (req, res) => {
  let {recipeId, userId, recipeUserId} = res.locals
  if (userId === recipeUserId) {
    return // can't send notification to yourself
  }
  if (!(recipeId && userId && recipeUserId)) {
    return // it was an unfavorite
  }
  try {
    await notifPost.postFavorite(recipeId, userId, recipeUserId)
    return
  } catch (e) {
    console.log('notifPost.postFavorite controller error')
    console.log(e.message)
  }
}

const postFollow = async (req, res) => {
  let {followerId, userId} = res.locals
  if (userId === followerId) {
    return // can't send notification to yourself
  }
  if (!(followerId && userId)) {
    return // it was an unfollow
  }
  try {
    await notifPost.postFollow(followerId, userId)
    return
  } catch (e) {
    console.log('notifPost.postFollow controller error')
    console.log(e.message)
  }
}

module.exports = {
  postRecipe,
  postReview,
  postFavorite,
  postFollow,
}
