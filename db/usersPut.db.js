const mysql = require('mysql')
const query = require('./query')

const putUsername = async (userId, value) => {
  let sql = mysql.format('UPDATE users SET username=? WHERE id=?', [
    value,
    userId,
  ])
  return await query(sql)
}

const putUserpic = async (userId, value) => {
  let sql = mysql.format('UPDATE users SET userpic=? WHERE id=?', [
    value,
    userId,
  ])
  return await query(sql)
}

const putUID = async (userId, value) => {
  let sql = mysql.format('UPDATE users SET uid=? WHERE id=?', [
    value,
    userId,
  ])
  return await query(sql)
}

module.exports = {
  putUsername,
  putUserpic,
  putUID
}
