const mysql = require('mysql')
const query = require('./query')

const wasRead = async (notifIdArray) => {
  var sql = 'UPDATE notifications SET wasRead = TRUE WHERE'
  // iterative add 'id = 1 OR id = 2 OR id = 7 OR id = 12'
  for (let i = 0; i < notifIdArray.length; i++) {
    sql = sql + ` (id = ${notifIdArray[i]})`

    if (notifIdArray.length > i + 1) {
      sql = sql + ' OR'
    }
  }
  return await query(sql)
}

module.exports = {
  wasRead,
}
