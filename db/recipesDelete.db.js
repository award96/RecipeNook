const mysql = require('mysql')
const query = require('./query')

const del = async (recipeId) => {
  let sql = mysql.format('DELETE FROM recipes WHERE (id=?)', [recipeId])
  return await query(sql)
}

module.exports = {
  del,
}
