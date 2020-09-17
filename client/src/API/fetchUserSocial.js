const fetchUserSocial = async (userId) => {
  let responseFollowers = await fetch(
    `/api/users/social/get/followers/${userId}`,
  )
  let responseFollowing = await fetch(
    `/api/users/social/get/following/${userId}`,
  )
  let responseFavorites = await fetch(
    `/api/users/social/get/favorites/${userId}`,
  )
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
