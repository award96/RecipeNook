const {feedbackPost} = require('../db')

const post = async (feedback) => {
  try {
    return await feedbackPost.post(feedback)
  } catch (e) {
    throw new Error(e.message)
  }
}

module.exports = {
  post,
}
