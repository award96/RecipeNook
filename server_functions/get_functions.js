const mysql = require('mysql')
const startConnection = require('../database')

const getArray = (request, response, sql, messageObj, postProcessing) => {
  console.log('\ngetArray is being called')
  console.log(messageObj.consoleLog)
  let connection = startConnection()
  connection.query(sql, (err, results, fields) => {
    if (err) {
      console.log(err)
      response.status(503).send({status: 503, message: messageObj.err})
      connection.end()
    } else {
      console.log(`\nsuccess ${messageObj.consoleLog}\n`)
      let resultArray = Object.values(JSON.parse(JSON.stringify(results)))
      console.log(resultArray)
      console.log(typeof resultArray)
      postProcessing(request, response, resultArray)
      connection.end()
    }
  })
}

const defaultProcessing = (request, response, array) => {
  response.status(200).send(array)
}

const singleItemProcessing = (request, response, array) => {
  console.log('singleItem')
  console.log(array)
  if (array.length > 1) {
    console.log('Multiple rows matching')
  }
  try {
    response.status(200).send(array[0])
  } catch (error) {
    response.status(500).send({status: 404, message: 'Found no matching row'})
  }
}
const notifProcessing = (request, response, array) => {
  console.log('notifProcessing')
  if (array.length < 5) {
    let diff = 5 - array.length
    console.log(`diff = ${diff}`)

    var sql = mysql.format(
      `
            SELECT  notifications.id,
                    userId,
                    wasRead,
                    otherUserId,
                    users.username as otherUsername,
                    recipeId,
                    ratingId,
                    kind
            FROM notifications
            JOIN users
            ON (notifications.otherUserId = users.id)
            WHERE (userId = ?)
            AND wasRead IS NOT NULL
            LIMIT ?
        `,
      [request.params.userId, diff],
    )

    let connection = startConnection()
    connection.query(sql, (err, results, fields) => {
      if (err) {
        console.log(err)
        response.status(200).send(array)
        connection.end()
      } else {
        console.log('successful notif padding')
        let resultArray = Object.values(JSON.parse(JSON.stringify(results)))
        console.log(resultArray)
        let finalArray = array.concat(resultArray)
        console.log(finalArray)
        response.status(200).send(finalArray)
        connection.end()
      }
    })
  } else {
    response.status(200).send(array)
  }
}

module.exports = {
  getArray,
  defaultProcessing,
  singleItemProcessing,
  notifProcessing,
}
