const updateComment = async (comment, rating, ratingId, userId, recipeId, authToken) => {
  let resp = await fetch(`/api/v2/reviews/${ratingId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({comment, rating, ratingId, userId, recipeId, authToken}),
  })
  return resp
}

export default updateComment
