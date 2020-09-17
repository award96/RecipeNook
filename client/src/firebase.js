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
  const {type} = authObject

  try {
    if (type === 'create') {
      const {email, password, username} = authObject
      const {user} = await auth.createUserWithEmailAndPassword(email, password)
      try {
        console.log('\nposting new user')
        let newUser = {
          username: username,
          email: email,
        }
        console.log(JSON.stringify(newUser))
        let response = await fetch('/api/users/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        })
        console.log('response')
        console.log(response)
        let jsonResp = await response.json()
        console.log('jsonResp')
        console.log(jsonResp.status)
        console.log(jsonResp)
      } catch (err) {
        console.log('\npost new user error')
        console.log(err)
      }
      return user
    } else if (type === 'login') {
      const {email, password} = authObject
      const {user} = await auth.signInWithEmailAndPassword(email, password)
      return user
    } else if (type === 'logout') {
      await auth.signOut()
      return
    } else {
      throw new Error('invalid authentication type')
    }
  } catch (error) {
    var errorCode = error.code
    var errorMessage = error.message

    console.log(`\nError ${errorCode}\n${errorMessage}`)
    return {errorCode}
  }
}

export {auth, handleUserAuth}