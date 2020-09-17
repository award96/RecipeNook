import React, {createContext, useState, useEffect} from 'react'
import {auth} from './firebase'

const UserContext = createContext({
  user: {},
  updateUserContext: () => {},
})

const UserContextProvider = (props) => {
  const [user, setUser] = useState()

  // update user context without API call
  const updateUserContext = (updateObj) => {
    let {type, value} = updateObj

    setUser((prevUser) => {
      return {
        ...prevUser,
        [type]: value,
      }
    })
  }
  // ComponentDidMount & Component Will Unmount
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    // cleanup function & initial auth function
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        getUserInfo(userAuth)
      } else {
        setUser('')
      }
    })

    // api call to merge DB data with firebase user data
    const getUserInfo = async (userAuth) => {
      try {
        let email = await userAuth.email
        let response = await fetch(`/api/users/get/${email}`, {signal})
        let respData = await response.json()

        userAuth.id = respData.id
        userAuth.username = respData.username
        userAuth.userpic = respData.userpic
        if (!userAuth.userpic) {
          // give them popup to set pic
          userAuth.shouldSetPic = true
        }
        // Now grab notifications with user Id
        let notifications = await fetch(
          `/api/users/social/get/notifications/${userAuth.id}`,
        )
        let notifData = await notifications.json()
        userAuth.notifications = notifData

        setUser(userAuth)
      } catch (error) {
        console.log(error)
        console.log('setting user after error')
        setUser(userAuth)
      }
    }
    // Component Will Unmount
    return function cleanup() {
      unsubscribe()
      abortController.abort()
    }
  }, [])

  return (
    <UserContext.Provider value={{user, updateUserContext}}>
      {props.children}
    </UserContext.Provider>
  )
}

export {UserContext, UserContextProvider}
