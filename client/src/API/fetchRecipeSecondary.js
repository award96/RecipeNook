const fetchRecipeSecondary = async (recipeId) => {
  let responseIngredients = await fetch(
    `/api/recipes/get/${recipeId}/ingredient`,
  )
  let responseDirections = await fetch(`/api/recipes/get/${recipeId}/direction`)
  let responseComments = await fetch(`/api/reviews/get/${recipeId}`)

  let jsonIngredients = await responseIngredients.json()
  let jsonDirections = await responseDirections.json()
  let jsonComments = await responseComments.json()

  return {
    ingredients: jsonIngredients,
    directions: jsonDirections,
    comments: jsonComments,
  }
}

export default fetchRecipeSecondary
