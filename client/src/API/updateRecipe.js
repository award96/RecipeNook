const updateRecipe = async (recipeId, recipeObj) => {
  recipeObj.id = recipeId
  let resp = await fetch(`/api/v2/recipes/${recipeId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(recipeObj),
  })
  return resp
}

export default updateRecipe
