const deleteNewUser = async (newUserId) => {
  let resp = await fetch(`/api/v2/users/${newUserId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({newUserId}),
  })
  return resp
}

export default deleteNewUser
