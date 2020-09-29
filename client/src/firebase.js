import firebase from 'firebase/app'
import postNewUser from './API/postNewUser'
import updateUserRequest from './API/updateUserRequest'
import deleteNewUser from './API/deleteNewUser'
import 'firebase/auth'

//
var firebaseConfig = {
  apiKey: 'AIzaSyAtJGBn-sClCXfVi6-bCSYJweB6q3nNml0',
  authDomain: 'project9-273100.firebaseapp.com',
  databaseURL: 'https://project9-273100.firebaseio.com',
  projectId: 'project9-273100',
  storageBucket: 'project9-273100.appspot.com',
  messagingSenderId: '813510025842',
  appId: '1:813510025842:web:8b4864fbc314749f2e98eb',
}

firebase.initializeApp(firebaseConfig)

// export authentication
const auth = firebase.auth()

//const provider = new firebase.auth.EmailAuthProvider()

// export handleUserAuth

const handleUserAuth = async (authObject) => {
  const {type, email, password, username} = authObject
  let newUserId
  try {
    if (type === 'create') {
      try {
        let newUser = {
          username: username,
          email: email,
        }
        let response = await postNewUser(newUser)
        newUserId = response
      } catch (error) {
        throw new Error('Create New User Error')
      }
      const {user} = await auth.createUserWithEmailAndPassword(email, password)
      await updateUserRequest({id: newUserId, type: 'uid', value: user.uid})
      return user
    } else if (type === 'login') {
      const {user} = await auth.signInWithEmailAndPassword(email, password)
      return user
    } else if (type === 'logout') {
      await auth.signOut()
      return
    } else {
      throw new Error('invalid authentication type')
    }
  } catch (error) {
    await deleteNewUser(newUserId)
    var errorCode = error.code
    return {errorCode}
  }
}



export {auth, handleUserAuth}
