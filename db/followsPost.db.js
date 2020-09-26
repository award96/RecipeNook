const mysql = require('mysql')
const query = require('./query')

const check = async (userId, followerId) => {
  let sql = mysql.format(
    'SELECT id FROM followers WHERE userId = ? AND followerId = ?',
    [userId, followerId],
  )
  return await query(sql)
}

const follow = async (userId, followerId) => {
  let sql = mysql.format(
    'INSERT INTO followers (userId, followerId) VALUES (?, ?);',
    [userId, followerId],
  )
  return await query(sql)
}

const unFollow = async (followersId) => {
  let sql = mysql.format('DELETE FROM followers WHERE id = ?;', [followersId])
  return await query(sql)
}

module.exports = {
  check,
  follow,
  unFollow,
}
