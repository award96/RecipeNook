const {feedbackPost} = require('../services')

const post = async (req, res) => {
  let {feedback} = req.body
  try {
    await feedbackPost.post(feedback)
    res.status(201).send()
  } catch (e) {
    console.log('feedbackPost controller error')
    console.log(e.message)
    res.status(500).send()
  }
}

module.exports = {
  post,
}
