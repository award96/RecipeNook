const {recipesDelete} = require('../services')

const del = async (req, res) => {
  let {recipeId} = req.params
  let {userId} = req.body
  let {authId} = res.locals
  if (authId !== userId) {
    console.log("user authentication failed recipesPut.controller")
    console.log("typeof authId")
    console.log(typeof authId)
    console.log("typeof userId")
    console.log(typeof userId)
    res.status(403).send('Forbidden') && next({status: 403, message: 'Forbidden'})
    return
  }
  try {
    await recipesDelete.del(recipeId)
    res.status(201).send()
  } catch (e) {
    console.log('recipesDelete controller Error')
    console.log(e.message)
    res.status(500).send()
  }
}

module.exports = {
  del,
}
