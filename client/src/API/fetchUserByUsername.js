const fetchUserByUsername = async (username) => {
  let resp = await fetch(`/api/v2/users/username/${username}`)
  let jsonResp = await resp.json()
  if (jsonResp && jsonResp.length > 0) {
    jsonResp = jsonResp[0]
  }
  return jsonResp
}

export default fetchUserByUsername
