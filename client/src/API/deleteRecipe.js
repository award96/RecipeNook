const deleteRecipe = async (recipeId, userId, authToken) => {
  let resp = await fetch(`/api/v2/recipes/${recipeId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({recipeId, userId, authToken}),
  })
  return resp
}

export default deleteRecipe
