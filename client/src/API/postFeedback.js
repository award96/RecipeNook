const postFeedback = async (feedback) => {
  let resp = await fetch('/api/v2/feedback', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({feedback}),
  })
  return resp
}

export default postFeedback
