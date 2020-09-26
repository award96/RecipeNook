const {usersGet} = require('../services')

const email = async (req, res) => {
  let {email} = req.body
  try {
    let user = await usersGet.email(email)
    res.status(200).send(user)
  } catch (e) {
    console.log('userGet.email controller error')
    console.log(e.message)
    res.status(500).send()
  }
}

const username = async (req, res) => {
  let {username} = req.params
  try {
    let user = await usersGet.username(username)
    res.status(200).send(user)
  } catch (e) {
    console.log('userGet.username controller error')
    console.log(e.message)
    res.status(500).send()
  }
}

const followers = async (req, res) => {
  let {userId} = req.params
  try {
    let followersArray = await usersGet.followers(userId)
    res.status(200).send(followersArray)
  } catch (e) {
    console.log('userGet.followers controller error')
    console.log(e.message)
    res.status(500).send()
  }
}

const followersForRecipe = async (req, res, next) => {
  let {userId} = res.locals
  try {
    let followersArray = await usersGet.followers(userId)
    res.locals.followersArray = followersArray
    return next()
  } catch (e) {
    console.log('userGet.followersForRecipe controller error')
    console.log(e.message)
    res.status(500).send() && next(e)
  }
}

const following = async (req, res) => {
  let {userId} = req.params
  try {
    let followingArray = await usersGet.following(userId)
    res.status(200).send(followingArray)
  } catch (e) {
    console.log('userGet.following controller error')
    console.log(e.message)
    res.status(500).send()
  }
}

const favorites = async (req, res) => {
  let {userId} = req.params
  try {
    let favoritesArray = await usersGet.favorites(userId)
    res.status(200).send(favoritesArray)
  } catch (e) {
    console.log('userGet.favorites controller error')
    console.log(e.message)
    res.status(500).send()
  }
}

const notifications = async (req, res) => {
  let {userId} = req.params
  try {
    let notificationsArray = await usersGet.notifications(userId)
    res.status(200).send(notificationsArray)
  } catch (e) {
    console.log('userGet.notifications controller error')
    console.log(e.message)
    res.status(500).send()
  }
}
module.exports = {
  email,
  username,
  followers,
  followersForRecipe,
  following,
  favorites,
  notifications,
}
