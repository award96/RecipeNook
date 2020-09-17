const deleteRecipe = async (recipeId) => {
  let resp = await fetch('/api/recipes/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({recipeId}),
  })
  let jsonResp = await resp.json()
  return jsonResp
}

export default deleteRecipe
