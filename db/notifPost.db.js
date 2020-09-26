const mysql = require('mysql')
const query = require('./query')

const sharedSQL =
  'INSERT INTO notifications (kind, userId, otherUserId, recipeId) VALUES (?, ?, ?, ?)'

const postRecipe = async (recipeId, userId, followersArray) => {
  let sqlArr = followersArray.map((item) => {
    return mysql.format(sharedSQL, [
      'followP',
      item.followerId,
      userId,
      recipeId,
    ])
  })
  let sql = sqlArr.join(';')
  return await query(sql, (multi = true))
}

const postReview = async (recipeId, userId, recipeUserId) => {
  let sql = mysql.format(sharedSQL, ['comment', recipeUserId, userId, recipeId])
  return await query(sql)
}

const postFavorite = async (recipeId, userId, recipeUserId) => {
  let sql = mysql.format(sharedSQL, [
    'favorite',
    recipeUserId,
    userId,
    recipeId,
  ])
  return await query(sql)
}

const postFollow = async (followerId, userId) => {
  let sql = mysql.format(
    'INSERT INTO notifications (kind, userId, otherUserId) VALUES (?, ?, ?)',
    ['follow', userId, followerId],
  )
  return await query(sql)
}

module.exports = {
  postRecipe,
  postReview,
  postFavorite,
  postFollow,
}
