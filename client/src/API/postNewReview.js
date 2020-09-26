const postNewReview = async (review) => {
  let response = await fetch('/api/v2/reviews', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(review),
  })
  return response
}

export default postNewReview
