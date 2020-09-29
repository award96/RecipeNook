const deleteComment = async (ratingId, userId, authToken) => {
  let resp = await fetch(`/api/v2/reviews/${ratingId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ratingId, userId, authToken}),
  })
  return resp
}

export default deleteComment
