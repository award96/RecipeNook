const mysql = require('mysql')
const startConnection = require('../database')

const postObj = (response, sql, messageObj) => {
  console.log('\npostObj is being called')
  console.log(messageObj.consoleLog)
  let connection = startConnection()
  connection.query(sql, (err, results, fields) => {
    if (err) {
      console.log(err)
      err.message.custom
      response.status(502).send({status: 502, message: err})
      connection.end()
    } else {
      console.log(`success ${messageObj.consoleLog}`)
      response.status(200).send({status: 200, message: messageObj.message})
      connection.end()
    }
  })
}

// Ensure queries happen sequentially
const chainPostObj = (sqlArray, messageObj, response) => {
  console.log('\n\nchainPostObj is being called')
  console.log('\nsqlArray')
  console.log(sqlArray)
  console.log('\nmessageObj')
  console.log(messageObj)
  let connection = startConnection()
  connection.query(sqlArray[0], (err, results, fields) => {
    if (err) {
      console.log('chainPostObj error')
      console.log(err)
      connection.end()
    } else {
      console.log(`success ${messageObj.consoleLog[0]}`)

      if (sqlArray.length === 2) {
        // stop chaining and complete the final query
        postObj(response, sqlArray[1], {
          ...messageObj,
          consoleLog: messageObj.consoleLog[1],
        })

        return
      }
      chainPostObj(
        sqlArray.slice(1),
        {
          ...messageObj,
          consoleLog: messageObj.consoleLog.slice(1),
        },
        response,
      )
      connection.end()
    }
  })
}

// internal - post an array as individual queries
const postArrays = (response, ingredients, directions, recipeId) => {
  console.log('\npostIngredientsArr')
  let connection = startConnection((multi = true))
  let sqlIngredientArr = ingredients.map((item) => {
    return mysql.format(
      'INSERT INTO ingredients (ingredient, recipeId) VALUES (?, ?)',
      [item, recipeId],
    )
  })
  let sqlDirectionArr = directions.map((item) => {
    return mysql.format(
      'INSERT INTO directions (direction, recipeId) VALUES (?, ?)',
      [item, recipeId],
    )
  })
  // combine ingredients and directions SQL query arrays
  let sqlArr = sqlIngredientArr.concat(sqlDirectionArr)
  let sql = sqlArr.join(';') // join multiple queries with ;

  connection.query(sql, (err, results, fields) => {
    if (err) {
      console.log(err)
      response.status(502).send({status: 502, message: 'Bad Gateway'})
    } else {
      console.log('\nsuccess postIngredients!')
      console.log('\nresults')
      console.log(results)
      response.status(201).send({status: 201, message: 'recipe created'})
    }
    connection.end()
  })
}
// internal - post an array as individual queries AFTER
//            removing old rows
const postUpdateArrays = (response, ingredients, directions, recipeId) => {
  let connection = startConnection((multi = true))
  let sqlDelete = `DELETE FROM ingredients WHERE recipeId = ${recipeId};
                    DELETE FROM directions WHERE recipeId = ${recipeId};`
  connection.query(sqlDelete, (err, results, fields) => {
    if (err) {
      console.log(err)
      response.status(502).send({status: 502, message: 'Bad Gateway'})
    } else {
      console.log('success deleting previous ingredients & directions')
      console.log('\nresults')
      console.log(results)
      postArrays(response, ingredients, directions, recipeId)
    }
    connection.end()
  })
}

const postNotification = (notifObject) => {
  let {kind, userId, otherUserId, recipeId} = notifObject
  if (userId === otherUserId) {
    console.log('No notification for user interacting with themselves')
    return
  }
  console.log('\npostNotification')
  console.log(notifObject)
  let sqlEnd
  let valueArray
  if (kind === 'follow') {
    sqlEnd = 'otherUserId) VALUES (?, ?, ?)'
    valueArray = [kind, userId, otherUserId]
  } else {
    sqlEnd = 'otherUserId, recipeId) VALUES (?, ?, ?, ?)'
    valueArray = [kind, userId, otherUserId, recipeId]
  }

  let sql = mysql.format(
    'INSERT INTO notifications (kind, userId, ' + sqlEnd,
    valueArray,
  )
  let connection = startConnection()
  connection.query(sql, (err, results, fields) => {
    if (err) {
      console.log(err)
    } else {
      console.log(`successful post notification of kind = ${kind}`)
    }
    connection.end()
  })
}

const postRecipeNotification = (posterUserId, recipeId) => {
  let sql = mysql.format('SELECT followerId FROM followers WHERE userId = ?', [
    posterUserId,
  ])
  let connection = startConnection()
  connection.query(sql, (err, results, fields) => {
    if (err) {
      console.log(err)
    } else {
      let resultArray = Object.values(JSON.parse(JSON.stringify(results)))
      let userIdList = resultArray.map((item) => item.followerId)
      console.log('success postRecipeNotification first step')
      console.log(userIdList)
      userIdList.forEach((userId) => {
        console.log(`posting userId = ${userId}`)
        postNotification({
          kind: 'followP',
          userId: userId,
          otherUserId: posterUserId,
          recipeId: recipeId,
        })
      })
    }
    connection.end()
  })
}

const postRecipe = (
  sql,
  response,
  ingredients,
  directions,
  isUpdate = false,
  updateId,
  userId,
) => {
  console.log('\npostRecipe called')
  console.log(`isUpdate = ${isUpdate}`)
  let connection = startConnection()
  connection.query(sql, (err, results, fields) => {
    if (err) {
      console.log(err)
      response.status(502).send({status: 502, message: err})
    } else {
      console.log('\nsuccess posting recipe')
      let resultObj = JSON.parse(JSON.stringify(results))
      console.log('postRecipe resultObj')
      console.log(resultObj)
      let recipeId = isUpdate ? updateId : resultObj.insertId
      if (isUpdate) {
        postUpdateArrays(response, ingredients, directions, recipeId)
      } else {
        postArrays(response, ingredients, directions, recipeId)
        postRecipeNotification(userId, recipeId)
      }
    }
    connection.end()
  })
}

// internal: called by cleanDuplicates
// does not delete comment, therefore a user can comment
// multiple times but only leave a rating once
const deleteStar = (id) => {
  let connection = startConnection()
  let sql = mysql.format('UPDATE ratings SET star=null WHERE id=?', [id])
  connection.query(sql, (err, results, fields) => {
    if (err) {
      console.log(err)
      connection.end()
    } else {
      console.log('\nsuccess!')
      console.log('\nresults')
      console.log(results)
      connection.end()
    }
  })
}
// internal: called by cleanDuplicates
// delete null rows
const deleteEmpty = () => {
  let connection = startConnection()
  let sql = 'DELETE FROM ratings WHERE star IS NULL AND review IS NULL'
  connection.query(sql, (err, results, fields) => {
    if (err) {
      console.log(err)
      connection.end()
    } else {
      console.log('\nsuccess! Deleted all empty from ratings')
      console.log('\nresults')
      console.log(results)
      connection.end()
    }
  })
}
// ensure only one star rating per user per recipe (reviews/create & reviews/update)
// (a user cannot give the same recipe 5 stars over and over again)
const cleanDuplicates = (userId, recipeId, insertId) => {
  let connection = startConnection()
  let sql = mysql.format(
    `
        SELECT id, star
        FROM ratings
        WHERE userID=?
        AND recipeID=?
        AND star IS NOT NULL
    `,
    [userId, recipeId],
  )
  console.log('cleanDuplicates sql')
  console.log(sql)
  connection.query(sql, (err, results, fields) => {
    if (err) {
      console.log(err)
      connection.end()
    } else {
      console.log('\ncleanDuplicates results')
      let resultArray = Object.values(JSON.parse(JSON.stringify(results)))
      console.log(resultArray)
      resultArray.forEach((rating, index) => {
        console.log(rating)
        if (insertId !== rating.id) {
          console.log('delete star')
          deleteStar(rating.id)
        } else {
          console.log('keep star')
        }
      })
      deleteEmpty()
      connection.end()
    }
  })
}

module.exports = {
  postObj,
  chainPostObj,
  postNotification,
  postRecipe,
  cleanDuplicates,
}
