const fetchUserSocial = async (userId) => {
  let responseFollowers = await fetch(`/api/v2/users/${userId}/followers`)
  let responseFollowing = await fetch(`/api/v2/users/${userId}/following`)
  let responseFavorites = await fetch(`/api/v2/users/${userId}/favorites`)
  let jsonFollowers = await responseFollowers.json()
  let jsonFollowing = await responseFollowing.json()
  let jsonFavorites = await responseFavorites.json()
  return {
    userId,
    followers: jsonFollowers,
    following: jsonFollowing,
    favorites: jsonFavorites,
  }
}

export default fetchUserSocial
