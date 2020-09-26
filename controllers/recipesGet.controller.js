const {recipesGet} = require('../services')

const all = async (req, res) => {
  let search
  if (req.query) {
    search = req.query.q
  }
  try {
    let recipeArray = await recipesGet.all(search)
    res.status(200).send(recipeArray)
  } catch (e) {
    console.log('recipesGet.all controller Error')
    console.log(e.message)
    res.status(500).send()
  }
}

const single = async (req, res) => {
  let {recipeId} = req.params
  try {
    let recipe = await recipesGet.single(recipeId)
    res.status(200).send(recipe)
  } catch (e) {
    console.log('recipesGet.single controller Error')
    console.log(e.message)
    res.status(500).send()
  }
}

const ingredients = async (req, res) => {
  let {recipeId} = req.params
  try {
    let ingredientsArray = await recipesGet.ingredients(recipeId)
    res.status(200).send(ingredientsArray)
  } catch (e) {
    console.log('recipesGet.ingredients controller Error')
    console.log(e.message)
    res.status(500).send()
  }
}

const directions = async (req, res) => {
  let {recipeId} = req.params
  try {
    let directionsArray = await recipesGet.directions(recipeId)
    res.status(200).send(directionsArray)
  } catch (e) {
    console.log('recipesGet.directions controller Error')
    console.log(e.message)
    res.status(500).send()
  }
}

module.exports = {
  all,
  single,
  ingredients,
  directions,
}
