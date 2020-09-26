const {recipesGet} = require('../db')

const all = async (search) => {
  try {
    let results
    if (search) {
      results = await recipesGet.search(search)
    } else {
      results = await recipesGet.all()
    }
    return Object.values(JSON.parse(JSON.stringify(results)))
  } catch (e) {
    throw new Error(e.message)
  }
}

const single = async (recipeId) => {
  try {
    let results = await recipesGet.single(recipeId)
    return Object.values(JSON.parse(JSON.stringify(results)))
  } catch (e) {
    throw new Error(e.message)
  }
}

const ingredients = async (recipeId) => {
  try {
    let results = await recipesGet.ingredients(recipeId)
    return Object.values(JSON.parse(JSON.stringify(results)))
  } catch (e) {
    throw new Error(e.message)
  }
}

const directions = async (recipeId) => {
  try {
    let results = await recipesGet.directions(recipeId)
    return Object.values(JSON.parse(JSON.stringify(results)))
  } catch (e) {
    throw new Error(e.message)
  }
}

module.exports = {
  all,
  single,
  ingredients,
  directions,
}
