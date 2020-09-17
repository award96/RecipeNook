const postFollow = async (userId, followerId) => {
  if (typeof userId === 'string') {
    userId = parseInt(userId)
  }
  if (typeof followerId === 'string') {
    followerId = parseInt(followerId)
  }

  let response = await fetch('/api/users/social/follow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({userId, followerId}),
  })
  let respJson = await response.json()
  return respJson
}

export default postFollow
