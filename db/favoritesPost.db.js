const mysql = require('mysql')
const query = require('./query')

const check = async (userId, recipeId) => {
  let sql = mysql.format(
    'SELECT id FROM favorites WHERE userId = ? AND recipeId = ?',
    [userId, recipeId],
  )
  return await query(sql)
}

const favorite = async (userId, recipeId) => {
  let sql = mysql.format(
    'INSERT INTO favorites (recipeId, userId) VALUES (?, ?);',
    [recipeId, userId],
  )
  return await query(sql)
}

const unFavorite = async (favoriteId) => {
  let sql = mysql.format('DELETE FROM favorites WHERE id = ?;', [favoriteId])
  return await query(sql)
}

module.exports = {
  check,
  favorite,
  unFavorite,
}
