const mysql = require('mysql')
const query = require('./query')

const post = async (feedback) => {
  let sql = mysql.format('INSERT INTO feedback (feedback) VALUES (?)', [
    feedback,
  ])
  return await query(sql)
}

module.exports = {
  post,
}
