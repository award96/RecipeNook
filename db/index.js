const recipesGet = require('./recipesGet.db')
const recipesPost = require('./recipesPost.db')
const recipesPut = require('./recipesPut.db')
const recipesDelete = require('./recipesDelete.db')
const ingredientsPost = require('./ingredientsPost.db')
const ingredientsDelete = require('./ingredientsDelete.db')
const directionsPost = require('./directionsPost.db')
const directionsDelete = require('./directionsDelete.db')
const reviewsGet = require('./reviewsGet.db')
const reviewsPost = require('./reviewsPost.db')
const reviewsPut = require('./reviewsPut.db')
const reviewsDelete = require('./reviewsDelete.db')
const favoritesPost = require('./favoritesPost.db')
const favoritesDelete = require('./favoritesDelete.db')
const followsPost = require('./followsPost.db')
const usersAuth = require('./usersAuth.db')
const usersGet = require('./usersGet.db')
const usersPost = require('./usersPost.db')
const usersPut = require('./usersPut.db')
const usersDelete = require('./usersDelete.db')
const notifPost = require('./notifPost.db')
const notifDelete = require('./notifDelete.db')
const notifPut = require('./notifPut.db')
const feedbackPost = require('./feedbackPost.db')

module.exports = {
  recipesGet,
  recipesPost,
  recipesPut,
  recipesDelete,
  ingredientsPost,
  ingredientsDelete,
  directionsPost,
  directionsDelete,
  followsPost,
  reviewsGet,
  reviewsPost,
  reviewsPut,
  reviewsDelete,
  favoritesPost,
  favoritesDelete,
  usersAuth,
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
  notifPost,
  notifDelete,
  notifPut,
  feedbackPost,
}
