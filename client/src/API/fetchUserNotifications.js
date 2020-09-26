const fetchUserNotifications = async (userId) => {
  let resp = await fetch(`/api/v2/users/${userId}/notifications`)
  return await resp.json()
}

export default fetchUserNotifications
