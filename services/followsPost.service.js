const {followsPost} = require('../db')

const post = async (userId, followerId) => {
  try {
    let isFollowing = await followsPost.check(userId, followerId)
    let isFollowingArray = Object.values(
      JSON.parse(JSON.stringify(isFollowing)),
    )
    if (isFollowingArray.length > 0) {
      // unfollow
      await followsPost.unFollow(isFollowingArray[0].id)
      return false
    } else {
      // follow
      await followsPost.follow(userId, followerId)
      return true
    }
  } catch (e) {
    throw new Error(e.message)
  }
}

module.exports = {
  post,
}
