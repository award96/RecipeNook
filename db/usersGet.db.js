const mysql = require('mysql')
const query = require('./query')

const email = async (email) => {
  let sql = mysql.format(
    'SELECT id, username, userpic FROM users WHERE email=?',
    [email],
  )
  return await query(sql)
}

const username = async (username) => {
  let sql = mysql.format('SELECT id, userpic FROM users WHERE username=?', [
    username,
  ])
  return await query(sql)
}

const followers = async (userId) => {
  let sql = mysql.format(
    `
        SELECT followers.userId as reqUserId, followers.followerId as respUserId, users.username, users.userpic
        FROM followers
        JOIN users
        ON (followers.followerId = users.id)
        WHERE (followers.userId = ?)`,
    [userId],
  )
  return await query(sql)
}

const following = async (userId) => {
  let sql = mysql.format(
    `
      SELECT followers.followerId as reqUserId, followers.userId as respUserId, users.username, users.userpic
      FROM followers
      JOIN users
      ON (followers.userId = users.id)
      WHERE (followers.followerId = ?)`,
    [userId],
  )
  return await query(sql)
}

const favorites = async (userId) => {
  let sql = mysql.format(
    `
      SELECT favorites.recipeId
      FROM favorites
      JOIN recipes
      ON (favorites.recipeId = recipes.id)
      WHERE (favorites.userId = ?)`,
    [userId],
  )
  return await query(sql)
}

const notifications = async (userId) => {
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
  return await query(sql)
}

const oldNotifications = async (userId, diff) => {
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
    [userId, diff],
  )
  return await query(sql)
}

module.exports = {
  email,
  username,
  followers,
  following,
  favorites,
  notifications,
  oldNotifications,
}
