/*
  updateUserBody:
    id: users ID
    type: 'username' || 'userpic' || 'uuid'
    value: new value to post to DB
*/

const updateUserRequest = async (updateUserBody) => {
  let resp = await fetch(`api/v2/users/${updateUserBody.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateUserBody),
  })
  return resp
}

export default updateUserRequest
