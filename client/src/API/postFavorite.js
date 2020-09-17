const postFavorite = async (recipeId, recipeUserId, userId) => {
  let response = await fetch('/api/users/social/favorite', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({recipeId, recipeUserId, userId}),
  })
  let jsonResp = await response.json()
  return jsonResp
}

export default postFavorite
