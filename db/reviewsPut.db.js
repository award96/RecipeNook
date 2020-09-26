const mysql = require('mysql')
const query = require('./query')

const put = async (reviewId, comment, rating) => {
  let sql = mysql.format(
    'UPDATE ratings SET review = ?, star = ?, posted = NOW() WHERE id = ?',
    [comment, rating, reviewId],
  )
  return await query(sql)
}

const clean = async (recipeId, userId) => {
  let sql = mysql.format(
    'UPDATE ratings SET star = null WHERE recipeID = ? AND userID = ?',
    [recipeId, userId],
  )
  return await query(sql)
}

module.exports = {
  put,
  clean,
}
