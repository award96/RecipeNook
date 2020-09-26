import React, {createContext, useState, useEffect} from 'react'
import {auth} from './firebase'
import fetchUserByEmail from './API/fetchUserByEmail'
import fetchUserNotifications from './API/fetchUserNotifications'

const UserContext = createContext({
  user: {},
  updateUserContext: () => {},
  reloadUserContext: () => {},
})

const UserContextProvider = (props) => {
  const [user, setUser] = useState()
  const [reload, setReload] = useState(false)

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
  // useEffect trigger
  const reloadUserContext = () => {
    setReload((prevState) => !prevState)
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
        let respData = await fetchUserByEmail(email, signal)
        if (respData && respData.length > 0) {
          respData = respData[0]
        }
        userAuth.id = respData.id
        userAuth.username = respData.username
        userAuth.userpic = respData.userpic
        if (!userAuth.userpic) {
          // give them popup to set pic
          userAuth.shouldSetPic = true
        }
        // Now grab notifications with user Id

        let notifData = await fetchUserNotifications(userAuth.id)
        userAuth.notifications = notifData
        setUser(userAuth)
      } catch (error) {
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
    <UserContext.Provider value={{user, updateUserContext, reloadUserContext}}>
      {props.children}
    </UserContext.Provider>
  )
}

export {UserContext, UserContextProvider}
