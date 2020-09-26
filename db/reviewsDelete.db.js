const mysql = require('mysql')
const query = require('./query')

const del = async (reviewId) => {
  let sql = mysql.format('DELETE FROM ratings WHERE (id=?)', [reviewId])
  return await query(sql)
}

const delRecipe = async (recipeId) => {
  let sql = mysql.format('DELETE FROM ratings WHERE (recipeID=?)', [recipeId])
  return await query(sql)
}

module.exports = {
  del,
  delRecipe,
}
