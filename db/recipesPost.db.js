const mysql = require('mysql')
const query = require('./query')

const post = async (title, tagline, img, userId) => {
  let sql = mysql.format(
    'INSERT INTO recipes (title, updated, userId, tagline, img) VALUES (?, curdate(), ?, ?, ?)',
    [title, userId, tagline, img],
  )
  return await query(sql)
}

module.exports = {
  post,
}
