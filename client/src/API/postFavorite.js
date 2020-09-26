const postFavorite = async (recipeId, recipeUserId, userId) => {
  if (typeof recipeId === 'string') {
    recipeId = parseInt(recipeId)
  }
  let response = await fetch(`/api/v2/favorites/${recipeId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({recipeId, recipeUserId, userId}),
  })
  return response
}

export default postFavorite
