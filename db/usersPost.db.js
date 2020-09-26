const mysql = require('mysql')
const query = require('./query')

const post = async (username, email) => {
  let sql = mysql.format('INSERT INTO users (username, email) VALUES (?, ?)', [
    username,
    email,
  ])
  return await query(sql)
}

module.exports = {
  post,
}
