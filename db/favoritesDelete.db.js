const mysql = require('mysql')
const query = require('./query')

const del = async (recipeId) => {
  let sql = mysql.format('DELETE FROM favorites WHERE (recipeId=?)', [recipeId])
  return await query(sql)
}

module.exports = {
  del,
}
