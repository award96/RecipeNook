const fetchUserByEmail = async (email, signal) => {
  let resp = await fetch(`/api/v2/users/email`, {
    signal,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email}),
  })
  let jsonResp = await resp.json()
  if (jsonResp && jsonResp.length > 0) {
    jsonResp = jsonResp[0]
  }
  return jsonResp
}

export default fetchUserByEmail
