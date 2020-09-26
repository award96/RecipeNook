import firebase from 'firebase/app'
import 'firebase/auth'

//
var firebaseConfig = { // secret info
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
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