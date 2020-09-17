const updateRecipe = async (recipeId, recipeObj) => {
  recipeObj.id = recipeId
  let resp = await fetch('/api/recipes/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(recipeObj),
  })
  let jsonResp = await resp.json()
  return jsonResp
}

export default updateRecipe
