const deleteComment = async (ratingId) => {
  let resp = await fetch('/api/reviews/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ratingId}),
  })
  let jsonResp = await resp.json()
  return jsonResp
}

export default deleteComment
