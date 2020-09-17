const express = require('express')
const http = require('http')
const path = require('path')
var bodyParser = require('body-parser')
let app = express()

// mysql
const mysql = require('mysql')
const startConnection = require('./database')
const {response} = require('express')
const e = require('express')

// server port and static page
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
} else {
  // local development
  app.use(express.static(path.join(__dirname, 'client/build')))
}

app.use(bodyParser.json())
const port = process.env.PORT || '8080'
app.set('port', port)
const server = http.createServer(app)
server.listen(port, () => console.log(`Running on localhost:${port}`))

// get and post functions
const get_functions = require('./server_functions/get_functions')
const post_functions = require('./server_functions/post_functions')

// API routes

/*
    recipes/get

        Get all the recipe data to populate the homepage

        get route
        REQ PARAMS: none
        RETURNS:    status 200
                    array of recipe objects, each with id, title, updated,
                    stars, favorites, tagline, directions, img, ingredient,
                    userId, username, email, userpic, !!!!!!!!!!totalFavorites <- need to implement
    recipes/create

        create a new recipe

        post route
        BODY: title, tagline, img, ingredients, directions, userId
        RETURNS:    status 201
                    message: Recipe Created

    recipes/update

        update an existing recipe

        post route
        BODY: id, title, tagline, img, ingredients, directions, userId
        RETURNS:    status 201
                    message: Recipe Created

    recipes/delete

        delete an existing recipe

        post route
        BODY: id
        RETURNS:    status 200
                    message: recipe deleted


    reviews/get/:recipeId

        Get all the reviews/comments for a specified recipe

        get route
        REQ PARAMS: recipeId
        RETURNS:    status 200
                    array of review objects, each with review, star, posted
                    username, userpic
    reviews/create

        Create a review/comment for a specified recipe

        post route
        BODY: comment, rating, userId, recipeId
        RETURNS:    status 200
                    message: Review Created

    reviews/update

        Update an existing review/comment for a specified recipe

        post route
        BODY: comment, rating, ratingId, userId, recipeId
        RETURNS:    status 200
                    message: Review updated

    reviews/delete

        Delete an existing review/comment for a specified recipe

        post route
        BODY: ratingId
        RETURNS:    status 200
                    message: review deleted

    users/get/:email

        Get the account info for a user when firebase logs them in

        get route
        REQ PARAMS: email
        RETURNS:    status 200
                    user object of user with matching email
                    with id, username, userpic

    users/get/username/:username

        Get the id and avatar pic for a user with the given username

        get route
        REQ PARAMS: username
        RETURNS:    status 200
                    user object of user with matching username
                    with id, userpic
    users/check/:username

        Check if the username is already taken

        get route
        REQ PARAMS: username
        RETURNS:    status 200
                    array of user objects with matching username
                    with username. Expected length === 0 or 1
                    0: false, username is not in use
                    1: true, username is in use


    users/create

        Create a new user in conjunction with firebase

        post route
        BODY: username, email
        RETURNS:    status 200
                    message: User Created


    users/update

        Update an existing user's username of avatar pic

        post route
        BODY: type, id, value (type indicates what we update (username,pic))
        RETURNS:    status 200
                    message: User Updated

    users/social/get/followers/:userId

        Get a user's followers

        get route
        REQ PARAMS: userId
        RETURNS:    status 200
                    Array of user objects containing
                    username, userpic

    users/social/get/following/:userId

        Get a user's following

        get route
        REQ PARAMS: userId
        RETURNS:    status 200
                    Array of user objects containing
                    username, userpic

    users/social/get/favorites/:userId

        Get a user's favorites

        get route
        REQ PARAMS: userId
        RETURNS:    status 200
                    Array of recipe objects containing
                    recipeId, title, img
    users/social/get/notifications/:userId

        Get a user's notifications

        get route
        REQ PARAMS: userId
        RETURNS:    status 200
                    Array of notification objects containing
                    notifications.id, userId, wasRead, otherUserId,
                    users.username as otherUsername, recipeId,
                    ratingId, kind
        NOTES:  Will never return less than 5 notifications if possible.

                will return all unread notifications, but if there are
                less than 5 unread notifications, it will make up the difference
                with already read notifications

    users/social/favorite

        favorite a recipe

        post route
        BODY: recipeId, userId
        RETURNS:    status 200
                    message: Recipe Favorited

    users/social/follow

        follow a user

        post route
        BODY: userId, followerId
        RETURNS:    status 200
                    message: Recipe Favorited

    users/social/viewNotif

        change existing notifications to "seen" status

        post route
        BODY: notifIdArray
        RETURNS:    status 200
                    message: wasRead
    feedback

        feedback submitted on about page, anonymous

        post route
        BODY: feedback
        RETURNS:  status 200
                  message: created

*/

//  Notifications

/*
    notifications are automatically posted when certain routes are called.
    In the case of a followP notification
    (wherein a user posts a recipe and all followers recieve a notification)
    an array of notifications are automatically posted.

    route:  the API route that triggers this notification INSERT
    userId: the user Id of the user to recieve the notification
    otherUserId:    the userId of the user who the notification references (ie "user x favorited your recipe")
    recipeId:   the id of the recipe the notification references
    ratingId:   the id of the rating/comment the notification references
    kind:   the type of notification (comment, follow, favorite, followP)
        comment:    user x commented on your recipe
        follow: user x followed you
        favorite: user x favorited your recipe
        followP:    user x (who you follow) posted a recipe

    route           |           userId  |   wasRead |   otherUserId |   recipeId    |   ratingId    |   kind

    recipes/create                  ✔      null            ✔              ✔              null             followP
    reviews/create                  ✔      null            ✔              ✔              ✔                comment
    users/social/favorite           ✔      null            ✔              ✔              null             favorite
    users/social/follow             ✔      null            ✔              null           null             follow

*/

// Get Routes

// basis for recipe request
const recipeSQL = `SELECT  recipes.id,
                            recipes.title,
                            recipes.updated,
                            avg_stars.stars,
                            avg_stars.countStars,
                            recipes.favorites,
                            recipes.tagline,
                            recipes.img,
                            recipes.userId,
                            users.username,
                            users.email,
                            users.userpic
                            FROM recipes
                            LEFT JOIN users
                            ON (recipes.userId = users.id)
                            LEFT OUTER JOIN ingredients
                            ON (recipes.id = ingredients.recipeId)
                            LEFT JOIN (
                            SELECT
                            ratings.recipeID as recipeID,
                            AVG(ratings.star) AS stars,
                            COUNT(ratings.star) as countStars
                            FROM ratings
                            GROUP BY ratings.recipeID
                            )
                            AS avg_stars
                            ON (recipes.id = avg_stars.recipeID)

                            `

app.get('/api/recipes/get/:recipeId?/:secondary?', (request, response) => {
  let {recipeId, secondary} = request.params
  let sql = recipeSQL
  if (secondary) {
    // getting directions or ingredients for recipe
    // ignore recipeSQL and create new query
    let sqlString =
      secondary === 'ingredient'
        ? 'SELECT ingredient FROM ingredients WHERE recipeId = ?'
        : 'SELECT direction FROM directions WHERE recipeId = ?'
    sql = mysql.format(sqlString, [recipeId])
  } else if (recipeId) {
    // seeking specific recipe
    // add GROUP BY and WHERE clause
    sql = mysql.format(
      recipeSQL +
        'GROUP BY recipes.id, ingredients.recipeId WHERE recipes.id = ?',
      [recipeId],
    )
  } else {
    // getting all recipes
    // add GROUP BY and ORDER BY rand() clause
    sql = sql + 'GROUP BY recipes.id, ingredients.recipeId ORDER BY rand()'
  }
  // SELECT from SQL db

  console.log('\n\nget recipes')
  console.log('recipeId')
  console.log(recipeId)
  console.log('secondary')
  console.log(secondary)
  console.log(sql)
  get_functions.getArray(
    request,
    response,
    sql,
    {err: 'Service Unavailable', consoleLog: 'recipes/get'},
    get_functions.defaultProcessing,
  )
})

app.get('/api/recipes/search/:query', (request, response) => {
  let queryString = '%' + request.params.query + '%'
  // add query and GROUP BY clause to recipeSQL
  let sql = mysql.format(
    recipeSQL +
      `WHERE recipes.title LIKE ?
        OR recipes.tagline LIKE ?
        OR ingredients.ingredient LIKE ?
        GROUP BY recipes.id,
				ingredients.recipeId`,
    [queryString, queryString, queryString],
  )
  console.log('api query')
  console.log(sql)
  get_functions.getArray(
    request,
    response,
    sql,
    {err: 'Service Unavailable', consoleLog: 'recipes/search'},
    get_functions.defaultProcessing,
  )
})

app.get('/api/reviews/get/:recipeId', (request, response) => {
  var sql = mysql.format(
    `
        SELECT  ratings.id,
                ratings.review,
                ratings.star,
                ratings.posted,
                users.username,
                users.userpic,
                ratings.userID
        FROM ratings
        LEFT JOIN users
        ON (ratings.userID = users.id)
        WHERE ratings.recipeID=?
        AND review IS NOT NULL
        ORDER BY ratings.posted DESC, ratings.id DESC`,
    [request.params.recipeId],
  )

  let dateProcessing = (request, response, resultArray) => {
    try {
      if (resultArray) {
        resultArray.forEach((comment) => {
          let dateTime = new Date(comment.posted)
          dateTime.setHours(dateTime.getHours() - 7)

          let options = {
            timeZone: 'America/Los_Angeles',
            weekday: 'short',
            hour: '2-digit',
            day: 'numeric',
            month: 'numeric',
            year: '2-digit',
          }

          let dateTimeString = dateTime.toLocaleString('en-US', options)
          comment.posted = dateTimeString
        })
      }
      response.status(200).send(resultArray)
    } catch (e) {
      console.log(e)
      response.status(200).send(resultArray)
    }
  }
  // SELECT from SQL db
  get_functions.getArray(
    request,
    response,
    sql,
    {err: 'Service Unavailable', consoleLog: 'recipes/get'},
    dateProcessing,
  )
})

app.get('/api/users/get/:email', (request, response) => {
  var sql = mysql.format(
    'SELECT id, username, userpic FROM users WHERE email=?',
    [request.params.email],
  )
  // SELECT from SQL db
  get_functions.getArray(
    request,
    response,
    sql,
    {err: 'Bad Gateway', consoleLog: 'users/get'},
    get_functions.singleItemProcessing,
  )
})

app.get('/api/users/get/username/:username', (request, response) => {
  var sql = mysql.format('SELECT id, userpic FROM users WHERE username=?', [
    request.params.username,
  ])
  // SELECT from SQL db
  get_functions.getArray(
    request,
    response,
    sql,
    {err: 'Bad Gateway', consoleLog: 'users/get/username'},
    get_functions.singleItemProcessing,
  )
})

app.get('/api/users/check/:username', (request, response) => {
  var sql = mysql.format('SELECT username FROM users WHERE username=?', [
    request.params.username,
  ])
  // SELECT from SQL db
  get_functions.getArray(
    request,
    response,
    sql,
    {err: 'Bad Gateway', consoleLog: 'users/check'},
    get_functions.defaultProcessing,
  )
})

app.get('/api/users/social/get/followers/:userId', (request, response) => {
  let userId = request.params.userId
  var sql = mysql.format(
    `
        SELECT followers.userId as reqUserId, followers.followerId as respUserId, users.username, users.userpic
        FROM followers
        JOIN users
        ON (followers.followerId = users.id)
        WHERE (followers.userId = ?)`,
    [userId],
  )
  get_functions.getArray(
    request,
    response,
    sql,
    {err: 'Bad Gateway', consoleLog: 'users/social/get/followers'},
    get_functions.defaultProcessing,
  )
})

app.get('/api/users/social/get/following/:userId', (request, response) => {
  let userId = request.params.userId
  var sql = mysql.format(
    `
        SELECT followers.followerId as reqUserId, followers.userId as respUserId, users.username, users.userpic
        FROM followers
        JOIN users
        ON (followers.userId = users.id)
        WHERE (followers.followerId = ?)`,
    [userId],
  )
  get_functions.getArray(
    request,
    response,
    sql,
    {err: 'Bad Gateway', consoleLog: 'users/social/get/following'},
    get_functions.defaultProcessing,
  )
})

app.get('/api/users/social/get/favorites/:userId', (request, response) => {
  let userId = request.params.userId
  var sql = mysql.format(
    `
        SELECT favorites.recipeId
        FROM favorites
        JOIN recipes
        ON (favorites.recipeId = recipes.id)
        WHERE (favorites.userId = ?)`,
    [userId],
  )
  get_functions.getArray(
    request,
    response,
    sql,
    {err: 'Bad Gateway', consoleLog: 'users/social/get/favorites'},
    get_functions.defaultProcessing,
  )
})

app.get('/api/users/social/get/notifications/:userId', (request, response) => {
  let userId = request.params.userId
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
        AND wasRead IS NULL
    `,
    [userId],
  )

  get_functions.getArray(
    request,
    response,
    sql,
    {err: 'Bad Gateway', consoleLog: 'users/social/get/notifications'},
    get_functions.notifProcessing,
  )
})

// Post Routes

app.post('/api/recipes/create', (request, response) => {
  let {
    title,
    tagline,
    img,
    ingredients,
    directions,
    userId,
    username,
  } = request.body
  // validate recipe before posting
  if (
    !(
      title &&
      tagline &&
      img &&
      ingredients.length > 0 &&
      directions.length > 0 &&
      userId
    )
  ) {
    response.status(406).send({status: 406, message: 'Incomplete Recipe'})
    return
  }

  let sql = mysql.format(
    'INSERT INTO recipes (title, updated, userId, tagline, img) VALUES (?, curdate(), ?, ?, ?)',
    [title, userId, tagline, img],
  )

  post_functions.postRecipe(
    sql,
    response,
    ingredients,
    directions,
    (isUpdate = false),
    (updateId = null),
    userId,
    username,
  )
})

app.post('/api/recipes/update', (request, response) => {
  let {id, title, tagline, img, ingredients, directions, userId} = request.body

  // validate recipe before posting
  if (
    !(
      title &&
      tagline &&
      img &&
      ingredients.length > 0 &&
      directions.length > 0 &&
      userId
    )
  ) {
    response.status(406).send({status: 406, message: 'Incomplete Recipe'})
    return
  }
  let directionsString = directions.join(';')

  let sql = mysql.format(
    `
        UPDATE recipes
        SET title = ?,
            tagline = ?,
            img = ?,
            directions = ?,
            updated = curdate()
        WHERE id = ?`,
    [title, tagline, img, directionsString, id],
  )
  console.log('recipes/update called')
  console.log(sql)
  post_functions.postRecipe(
    sql,
    response,
    ingredients,
    directions,
    (isUpdate = true),
    (updateId = id),
  )
})

app.post('/api/recipes/delete', (request, response) => {
  let {recipeId} = request.body

  // delete favorites
  let sqlFavorites = mysql.format('DELETE FROM favorites WHERE (recipeId=?)', [
    recipeId,
  ])
  // delete notifications
  let sqlNotifications = mysql.format(
    'DELETE FROM notifications WHERE (recipeId=?)',
    [recipeId],
  )
  // delete ratings
  let sqlRatings = mysql.format('DELETE FROM ratings WHERE (recipeID=?)', [
    recipeId,
  ])
  // delete ingredients
  let sqlIngredients = mysql.format(
    'DELETE FROM ingredients WHERE (recipeId=?)',
    [recipeId],
  )
  // delete directions
  let sqlDirections = mysql.format(
    'DELETE FROM directions WHERE (recipeId=?)',
    [recipeId],
  )
  // Finally delete recipe
  let sql = mysql.format('DELETE FROM recipes WHERE (id=?)', [recipeId])

  post_functions.chainPostObj(
    [
      sqlFavorites,
      sqlNotifications,
      sqlRatings,
      sqlIngredients,
      sqlDirections,
      sql,
    ],

    {
      err: 'Bad Gateway',
      consoleLog: [
        'deleting recipe favorites',
        'deleting recipe notifications',
        'deleting recipe ratings',
        'deleting recipe ingredients',
        'deleting recipe directions',
        '/recipes/delete',
      ],
      message: 'recipe deleted',
    },

    response,
  )
})

app.post('/api/reviews/create', (request, response) => {
  console.log('request to /api/reviews/create')
  let body = request.body
  let {comment, rating, userId, recipeId, recipeUserId} = body
  console.log(`rating = ${rating}`)

  let connection = startConnection()
  if (!comment) {
    var sql = mysql.format(
      'INSERT INTO ratings (star, userID, recipeID, posted) VALUES (?, ?, ?, NOW());',
      [rating, userId, recipeId],
    )
  } else {
    sql = mysql.format(
      'INSERT INTO ratings (review, star, userID, recipeID, posted) VALUES (?, ?, ?, ?, NOW());',
      [comment, rating, userId, recipeId],
    )
  }
  connection.query(sql, (err, results, fields) => {
    if (err) {
      console.log(err)
      response.status(502).send({status: 502, message: err})
      connection.end()
    } else {
      console.log('\nsuccess!')
      console.log('\nresults')
      console.log(results)
      let resultObj = JSON.parse(JSON.stringify(results))
      response.status(200).send({
        status: 200,
        message: 'Review Created',
        insertId: resultObj.insertId,
      })
      connection.end()

      // ensure a user's most recent star rating is their only star rating
      if (rating) {
        post_functions.cleanDuplicates(userId, recipeId, resultObj.insertId)
      }
      post_functions.postNotification({
        kind: 'comment',
        userId: recipeUserId,
        otherUserId: userId,
        recipeId: recipeId,
      })
    }
  })
})

app.post('/api/reviews/update', (request, response) => {
  let {comment, rating, ratingId, userId, recipeId} = request.body
  console.log('api/reviews/update')
  console.log(`rating = ${rating}`)
  let sql = mysql.format(
    'UPDATE ratings SET review = ?, star = ?, posted = NOW() WHERE id = ?',
    [comment, rating, ratingId],
  )
  let connection = startConnection()

  connection.query(sql, (err, results, fields) => {
    if (err) {
      console.log(err)
      response.status(502).send({status: 502, message: err})
    } else {
      console.log('\nsuccess reviews update')
      response.status(200).send({status: 200, message: 'Review updated'})
      if (rating) {
        post_functions.cleanDuplicates(userId, recipeId, ratingId)
      }
    }
  })
})

app.post('/api/reviews/delete', (request, response) => {
  let {ratingId} = request.body
  let sql = mysql.format('DELETE FROM ratings WHERE (id=?)', [ratingId])
  console.log(sql)
  post_functions.postObj(response, sql, {
    err: 'Bad Gateway',
    consoleLog: 'reviews/delete',
    message: 'review deleted',
  })
})

// Create User

app.post('/api/users/create', (request, response) => {
  let body = request.body
  let {username, email} = body

  var sql = mysql.format('INSERT INTO users (username, email) VALUES (?, ?);', [
    username,
    email,
  ])
  // insert to SQL db
  post_functions.postObj(response, sql, {
    err: 'Bad Gateway',
    consoleLog: 'users/create',
    message: 'user created',
  })
})

app.post('/api/users/update', (request, response) => {
  let body = request.body
  let {type, id, value} = body

  if (type === 'username') {
    var sql = mysql.format('UPDATE users SET username=? WHERE id=?', [
      value,
      id,
    ])
  } else if (type === 'userpic') {
    var sql = mysql.format('UPDATE users SET userpic=? WHERE id=?', [value, id])
  } else {
    // type of post request not understood
    response.status(400).send({status: 400, message: 'Bad Request'})
    return
  }
  // insert to SQL db
  post_functions.postObj(response, sql, {
    err: 'Bad Gateway',
    consoleLog: 'users/update',
    message: 'user updated',
  })
})

app.post('/api/users/social/favorite', (request, response) => {
  let {recipeId, recipeUserId, userId} = request.body

  var sql = mysql.format(
    'SELECT id FROM favorites WHERE recipeId = ? AND userId = ?',
    [recipeId, userId],
  )
  console.log('\nfavorite')
  console.log(sql)
  let connection = startConnection()
  connection.query(sql, (err, results, fields) => {
    if (err) {
      console.log(err)
      response
        .status(502)
        .send({status: 502, message: 'Could not complete request'})
    } else {
      let resultArray = Object.values(JSON.parse(JSON.stringify(results)))
      var sqlPost, messageObj
      console.log('resultArray')
      console.log(resultArray)
      if (resultArray.length === 0) {
        console.log('insert')
        sqlPost = mysql.format(
          'INSERT INTO favorites (recipeId, userId) VALUES (?, ?);',
          [recipeId, userId],
        )
        messageObj = {
          err: 'Bad Gateway',
          consoleLog: 'users/social/favorite',
          message: 'created',
        }
      } else {
        console.log('delete')
        sqlPost = mysql.format('DELETE FROM favorites WHERE id = ?;', [
          resultArray[0].id,
        ])
        messageObj = {
          err: 'Bad Gateway',
          consoleLog: 'users/social/UNfavorite',
          message: 'deleted',
        }
      }

      post_functions.postObj(response, sqlPost, messageObj)

      if (resultArray.length === 0) {
        post_functions.postNotification({
          kind: 'favorite',
          userId: recipeUserId,
          otherUserId: userId,
          recipeId: recipeId,
        })
      }
    }
    connection.end()
  })
})

app.post('/api/users/social/follow', (request, response) => {
  let {userId, followerId} = request.body

  if (userId === followerId) {
    console.log('Error bad request. A user cannot follow themselves.')
    response.status(400).send({
      status: 400,
      message: 'Error bad request. A user cannot follow themselves.',
    })
    return
  }
  // check if already following
  var sql = mysql.format(
    'SELECT id FROM followers WHERE userId = ? AND followerId = ?',
    [userId, followerId],
  )
  let connection = startConnection()
  connection.query(sql, (err, results, fields) => {
    if (err) {
      console.log(err)
      response
        .status(502)
        .send({status: 502, message: 'Could not complete request'})
    } else {
      let resultArray = Object.values(JSON.parse(JSON.stringify(results)))
      var sqlPost, messageObj
      if (resultArray.length === 0) {
        // if not already following follow them
        sqlPost = mysql.format(
          'INSERT INTO followers (userId, followerId) VALUES (?, ?);',
          [userId, followerId],
        )
        messageObj = {
          err: 'Bad Gateway',
          consoleLog: 'users/social/follow',
          message: 'created',
        }
      } else {
        // if already following unfollow them
        sqlPost = mysql.format('DELETE FROM followers WHERE id = ?;', [
          resultArray[0].id,
        ])
        messageObj = {
          err: 'Bad Gateway',
          consoleLog: 'users/social/UNfollow',
          message: 'deleted',
        }
      }

      post_functions.postObj(response, sqlPost, messageObj)

      if (resultArray.length === 0) {
        post_functions.postNotification({
          kind: 'follow',
          userId: userId,
          otherUserId: followerId,
        })
      }
    }
    connection.end()
  })
})

app.post('/api/users/social/viewNotif', (request, response) => {
  let {notifIdArray} = request.body
  console.log('viewNotif')
  console.log(notifIdArray)

  var sql = 'UPDATE notifications SET wasRead = TRUE WHERE'

  for (let i = 0; i < notifIdArray.length; i++) {
    sql = sql + ` (id = ${notifIdArray[i]})`

    if (notifIdArray.length > i + 1) {
      sql = sql + ' OR'
    }
  }

  post_functions.postObj(response, sql, {
    err: 'Bad Gateway',
    consoleLog: 'users/social/viewNotic',
    message: 'wasRead',
  })
})

app.post('/api/feedback', (request, response) => {
  let {feedback} = request.body

  var sql = mysql.format('INSERT INTO feedback (feedback) VALUES (?)', [
    feedback,
  ])
  post_functions.postObj(response, sql, {
    err: 'Bad Gateway',
    consoleLog: 'api/feedback',
    message: 'created',
  })
})

// serve correct static page
app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, 'client/build', 'index.html'))
})
