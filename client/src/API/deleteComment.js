const deleteComment = async (ratingId) => {
  let resp = await fetch(`/api/v2/reviews/${ratingId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ratingId}),
  })
  return resp
}

export default deleteComment
