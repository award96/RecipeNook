const mysql = require('mysql')
const query = require('./query')

const auth = async (uid) => {
  let sql = mysql.format('SELECT id FROM users WHERE uid = ?', [
    uid,
  ])
  return await query(sql)
}

module.exports = {
  auth,
}
