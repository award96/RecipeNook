const startConnection = require('../database')

query = function (sql, multi = false) {
  return new Promise(function (resolve, reject) {
    let connection = startConnection(multi)
    connection.query(sql, (err, results) => {
      if (err) {
        reject(new Error(err))
      } else {
        resolve(results)
      }
    })
    connection.end()
  })
}

module.exports = query
