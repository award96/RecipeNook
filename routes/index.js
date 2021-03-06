const express = require('express')
const {
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
  usersAuth,
  usersPost,
  usersGet,
  usersPut,
  usersDelete,
  notifPost,
  notifDelete,
  notifPut,
  feedbackPost,
} = require('../controllers')
const router = express.Router()

// recipes
router.get('/recipes', recipesGet.all)
router.post('/recipes', [
  usersAuth.auth,
  recipesPost.post,
  ingredientsPost.post,
  directionsPost.post,
  usersGet.followersForRecipe,
  notifPost.postRecipe,
])

router.get('/recipes/:recipeId', recipesGet.single)
router.put('/recipes/:recipeId', [
  usersAuth.auth,
  recipesPut.put,
  ingredientsDelete.del,
  directionsDelete.del,
  ingredientsPost.post,
  directionsPost.post,
])
router.delete('/recipes/:recipeId', [
  usersAuth.auth,
  notifDelete.del,
  favoritesDelete.del,
  reviewsDelete.delRecipe,
  ingredientsDelete.del,
  directionsDelete.del,
  recipesDelete.del,
])

router.get('/recipes/:recipeId/ingredients', recipesGet.ingredients)

router.get('/recipes/:recipeId/directions', recipesGet.directions)

// reviews
router.post('/reviews', [usersAuth.auth, reviewsPost.post, notifPost.postReview])

router.get('/reviews/:recipeId', reviewsGet.all)

router.put('/reviews/:reviewId', usersAuth.auth, reviewsPut.put)
router.delete('/reviews/:reviewId', usersAuth.auth, reviewsDelete.del)

// favorite
router.post('/favorites/:recipeId', favoritesPost.post, notifPost.postFavorite)

// follow
router.post('/follows/:userId', followsPost.post, notifPost.postFollow)

// users
router.post('/users', usersPost.post)
router.post('/users/email', usersGet.email)

router.get('/users/username/:username', usersGet.username)

router.put('/users/:userId', usersPut.put)
// will only delete a user with no corresponding firebase acct
router.delete('/users/:userId', usersDelete.del)

router.get('/users/:userId/followers', usersGet.followers)

router.get('/users/:userId/following', usersGet.following)

router.get('/users/:userId/favorites', usersGet.favorites)

router.get('/users/:userId/notifications', usersGet.notifications)
router.put('/notifications', notifPut.wasRead) // change notifications to 'wasRead'

// feedback
router.post('/feedback', feedbackPost.post)

module.exports = router
