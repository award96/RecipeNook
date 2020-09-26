const readNotifications = async (notifIdArray) => {
  if (!notifIdArray || notifIdArray.length === 0) {
    return
  }
  await fetch('/api/v2/notifications', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({notifIdArray}),
  })
}

export default readNotifications
