// the user owns the recipe and clicks the edit icon
const redirectEditRecipe = (prevRecipe, history) => {
  history.push({
    pathname: '/create-recipe',
    state: {
      isEditing: true,
      prevRecipe,
    },
  })
}

export default redirectEditRecipe
