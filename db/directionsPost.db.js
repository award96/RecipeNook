const mysql = require('mysql')
const query = require('./query')

const post = async (recipeId, directions) => {
  let sqlArr = directions.map((item) => {
    return mysql.format(
      'INSERT INTO directions (direction, recipeId) VALUES (?, ?)',
      [item, recipeId],
    )
  })
  let sql = sqlArr.join(';')
  return await query(sql, (multi = true))
}

module.exports = {
  post,
}
