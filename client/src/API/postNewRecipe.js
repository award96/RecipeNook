const postNewRecipe = async (newRecipe) => {
  let response = await fetch('/api/v2/recipes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newRecipe),
  })
  return response
}

export default postNewRecipe
