const mysql = require('mysql')
const query = require('./query')

const post = async (recipeId, userId, rating, comment) => {
  let sql
  if (!comment) {
    sql = mysql.format(
      'INSERT INTO ratings (star, userID, recipeID, posted) VALUES (?, ?, ?, NOW());',
      [rating, userId, recipeId],
    )
  } else {
    sql = mysql.format(
      'INSERT INTO ratings (review, star, userID, recipeID, posted) VALUES (?, ?, ?, ?, NOW());',
      [comment, rating, userId, recipeId],
    )
  }
  return await query(sql)
}

module.exports = {
  post,
}
