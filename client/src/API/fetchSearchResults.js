const fetchSearchResults = async (search) => {
  let query = search.replace(' ', '+')
  let resp = await fetch(`/api/v2/recipes?q=${search}`)
  return await resp.json()
}

export default fetchSearchResults
