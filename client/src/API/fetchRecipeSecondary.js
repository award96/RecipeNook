const fetchRecipeSecondary = async (recipeId) => {
  let responseIngredients = await fetch(
    `/api/v2/recipes/${recipeId}/ingredients`,
  )
  let responseDirections = await fetch(`/api/v2/recipes/${recipeId}/directions`)
  let responseComments = await fetch(`/api/v2/reviews/${recipeId}`)

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
