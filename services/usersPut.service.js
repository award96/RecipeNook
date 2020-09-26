const {usersPut} = require('../db')

const put = async (userId, type, value) => {
  if (!(type || value)) {
    // ensure no nulls
    throw new Error('Incomplete Request - usersPut.service')
  }
  try {
    if (type === 'username') {
      await usersPut.putUsername(userId, value)
    } else if (type === 'userpic') {
      await usersPut.putUserpic(userId, value)
    } else {
      throw new Error('Unrecognized Type')
    }
  } catch (e) {
    throw new Error(e.message)
  }
}

module.exports = {
  put,
}
