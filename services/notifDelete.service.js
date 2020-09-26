const {notifDelete} = require('../db')

const del = async (recipeId) => {
  try {
    await notifDelete.del(recipeId)
  } catch (e) {
    throw new Error(e.message)
  }
}

module.exports = {
  del,
}
