const {usersDelete} = require('../db')

const del = async (userId) => {
  try {
    await usersDelete.del(userId)
  } catch (e) {
    throw new Error(e.message)
  }
}

module.exports = {
  del,
}
