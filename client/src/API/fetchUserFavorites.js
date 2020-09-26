const fetchUserFavorites = async (userId) => {
  let resp = await fetch(`/api/v2/users/${userId}/favorites`)
  return await resp.json()
}

export default fetchUserFavorites
