const mysql = require('mysql')
const secret_info = require('./secret_info')
// thanks to https://gist.github.com/austinhale/c7d0ba1299ab0891e90834523aa62b02#file-medium-mysql-connection-example-js

let startConnection = (multi = false) => {
  let connection = mysql.createConnection({
    host: secret_info.db_host,
    database: secret_info.db_name,
    user: secret_info.db_user,
    password: secret_info.db_pass,
    ssl: {
      ca: secret_info.ssl_ca,
      cert: secret_info.ssl_cert,
      key: secret_info.ssl_key,
    },
    multipleStatements: multi,
  })

  connection.connect(function (err) {
    if (err) {
      console.error('Error connecting: ' + err.stack)
      console.log('\n\nssl_ca')
      console.log(secret_info.ssl_ca)
      return
    }
    console.log('Connected as thread id: ' + connection.threadId)
  })

  return connection
}

module.exports = startConnection
