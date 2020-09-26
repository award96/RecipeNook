const postNewUser = async (newUser) => {
  let response = await fetch('/api/v2/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  })
  return await response.json()
}

export default postNewUser
