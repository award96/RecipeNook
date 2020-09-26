const recipesGet = require('./recipesGet.service')
const recipesPost = require('./recipesPost.service')
const recipesPut = require('./recipesPut.service')
const recipesDelete = require('./recipesDelete.service')
const ingredientsPost = require('./ingredientsPost.service')
const ingredientsDelete = require('./ingredientsDelete.service')
const directionsPost = require('./directionsPost.service')
const directionsDelete = require('./directionsDelete.service')
const reviewsGet = require('./reviewsGet.service')
const reviewsPost = require('./reviewsPost.service')
const reviewsPut = require('./reviewsPut.service')
const reviewsDelete = require('./reviewsDelete.service')
const favoritesPost = require('./favoritesPost.service')
const favoritesDelete = require('./favoritesDelete.service')
const followsPost = require('./followsPost.service')
const usersPost = require('./usersPost.service')
const usersGet = require('./usersGet.service')
const usersPut = require('./usersPut.service')
const usersDelete = require('./usersDelete.service')
const notifPost = require('./notifPost.service')
const notifDelete = require('./notifDelete.service')
const notifPut = require('./notifPut.service')
const feedbackPost = require('./feedbackPost.service')

module.exports = {
  recipesGet,
  recipesPost,
  recipesPut,
  recipesDelete,
  ingredientsPost,
  ingredientsDelete,
  directionsPost,
  directionsDelete,
  reviewsGet,
  reviewsPost,
  reviewsPut,
  reviewsDelete,
  favoritesPost,
  favoritesDelete,
  followsPost,
  usersPost,
  usersGet,
  usersPut,
  usersDelete,
  notifPost,
  notifDelete,
  notifPut,
  feedbackPost,
}
