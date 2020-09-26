const {reviewsGet} = require('../db')
const dateProcessing = require('../utilities/dateProcessing')

const all = async (recipeId) => {
  try {
    let results = await reviewsGet.all(recipeId)
    let resultArray = Object.values(JSON.parse(JSON.stringify(results)))
    return dateProcessing(resultArray)
  } catch (e) {
    throw new Error(e.message)
  }
}

module.exports = {
  all,
}
