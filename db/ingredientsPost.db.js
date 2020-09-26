const mysql = require('mysql')
const query = require('./query')

const post = async (recipeId, ingredients) => {
  let sqlArr = ingredients.map((item) => {
    return mysql.format(
      'INSERT INTO ingredients (ingredient, recipeId) VALUES (?, ?)',
      [item, recipeId],
    )
  })
  let sql = sqlArr.join(';')
  return await query(sql, (multi = true))
}

module.exports = {
  post,
}
