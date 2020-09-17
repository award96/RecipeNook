const updateComment = async (comment, rating, ratingId, userId, recipeId) => {
  let resp = await fetch('/api/reviews/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({comment, rating, ratingId, userId, recipeId}),
  })
  let jsonResp = await resp.json()
  return jsonResp
}

export default updateComment
