const postFollow = async (userId, followerId) => {
  if (typeof userId === 'string') {
    userId = parseInt(userId)
  }
  if (typeof followerId === 'string') {
    followerId = parseInt(followerId)
  }

  let response = await fetch(`/api/v2/follows/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({userId, followerId}),
  })
  return response
}

export default postFollow
