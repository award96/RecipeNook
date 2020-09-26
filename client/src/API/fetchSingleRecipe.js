const fetchSingleRecipe = async (recipeId) => {
  let resp = await fetch(`/api/v2/recipes/${recipeId}`)
  let jsonResp = await resp.json()
  return jsonResp[0]
}

export default fetchSingleRecipe
