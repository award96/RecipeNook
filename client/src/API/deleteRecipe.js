const deleteRecipe = async (recipeId) => {
  let resp = await fetch(`/api/v2/recipes/${recipeId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({recipeId}),
  })
  return resp
}

export default deleteRecipe
