const mysql = require('mysql')
const query = require('./query')

const del = async (userId) => {
  let sql = mysql.format('DELETE FROM users WHERE (id=?)', [userId])
  return await query(sql)
}

module.exports = {
  del,
}
