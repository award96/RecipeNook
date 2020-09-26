const recipesGet = require('./recipesGet.controller')
const recipesPost = require('./recipesPost.controller')
const recipesPut = require('./recipesPut.controller')
const recipesDelete = require('./recipesDelete.controller')
const ingredientsPost = require('./ingredientsPost.controller')
const ingredientsDelete = require('./ingredientsDelete.controller')
const directionsPost = require('./directionsPost.controller')
const directionsDelete = require('./directionsDelete.controller')
const reviewsPost = require('./reviewsPost.controller')
const reviewsGet = require('./reviewsGet.controller')
const reviewsPut = require('./reviewsPut.controller')
const reviewsDelete = require('./reviewsDelete.controller')
const favoritesPost = require('./favoritesPost.controller')
const favoritesDelete = require('./favoritesDelete.controller')
const followsPost = require('./followsPost.controller')
const usersPost = require('./usersPost.controller')
const usersGet = require('./usersGet.controller')
const usersPut = require('./usersPut.controller')
const usersDelete = require('./usersDelete.controller')
const notifPost = require('./notifPost.controller')
const notifDelete = require('./notifDelete.controller')
const notifPut = require('./notifPut.contorller')
const feedbackPost = require('./feedbackPost.controller')

module.exports = {
  recipesGet,
  recipesPost,
  recipesPut,
  recipesDelete,
  ingredientsPost,
  ingredientsDelete,
  directionsPost,
  directionsDelete,
  reviewsPost,
  reviewsGet,
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
