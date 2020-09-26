const {usersGet} = require('../db')

const email = async (email) => {
  try {
    let results = await usersGet.email(email)
    return Object.values(JSON.parse(JSON.stringify(results)))
  } catch (e) {
    throw new Error(e.message)
  }
}

const username = async (username) => {
  try {
    let results = await usersGet.username(username)
    return Object.values(JSON.parse(JSON.stringify(results)))
  } catch (e) {
    throw new Error(e.message)
  }
}

const followers = async (userId) => {
  try {
    let results = await usersGet.followers(userId)
    return Object.values(JSON.parse(JSON.stringify(results)))
  } catch (e) {
    throw new Error(e.message)
  }
}

const following = async (userId) => {
  try {
    let results = await usersGet.following(userId)
    return Object.values(JSON.parse(JSON.stringify(results)))
  } catch (e) {
    throw new Error(e.message)
  }
}

const favorites = async (userId) => {
  try {
    let results = await usersGet.favorites(userId)
    return Object.values(JSON.parse(JSON.stringify(results)))
  } catch (e) {
    throw new Error(e.message)
  }
}

const notifications = async (userId) => {
  try {
    let results = await usersGet.notifications(userId)
    let resultArray = Object.values(JSON.parse(JSON.stringify(results)))
    let diff = 5 - resultArray.length
    if (diff > 0) {
      // show user 5 notifications even if they're old
      let addResults = await usersGet.oldNotifications(userId, diff)
      let addResultArray = Object.values(JSON.parse(JSON.stringify(addResults)))
      resultArray = resultArray.concat(addResultArray)
    }
    return resultArray
  } catch (e) {
    throw new Error(e.message)
  }
}

module.exports = {
  email,
  username,
  followers,
  following,
  favorites,
  notifications,
}
