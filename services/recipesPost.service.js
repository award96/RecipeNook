const {recipesPost} = require('../db')

const post = async (title, tagline, img, userId) => {
  // require complete recipe
  if (!(title && tagline && img && userId)) {
    throw new Error('incomplete request - recipesPost.service')
  }
  try {
    let results = await recipesPost.post(title, tagline, img, userId)
    let resultObj = JSON.parse(JSON.stringify(results))
    return resultObj.insertId
  } catch (e) {
    throw new Error(e.message)
  }
}

module.exports = {
  post,
}
