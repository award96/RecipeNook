const fetchAllRecipes = async () => {
  let resp = await fetch('/api/v2/recipes')
  return await resp.json()
}

export default fetchAllRecipes
