const checkIfUsernameAvail = async (username) => {
  let response = await fetch(`/api/v2/users/username/${username}`)
  let jsonResp = await response.json()
  return jsonResp.length === 0
}

export default checkIfUsernameAvail
