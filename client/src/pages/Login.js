import React, {useState, useEffect} from 'react'
import {AccountForm, AlertBar} from '../components/index'
import {useLocation} from 'react-router-dom'

const Login = (props) => {
  const {routes} = props
  // Inform user if they were redirected here
  let location = useLocation()
  const [isAlert, setIsAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  // If user was redirected, set UI alert
  useEffect(() => {
    if (location.props && location.props.wasRedirected) {
      setIsAlert(true)
      setAlertMessage(location.props.alertMessage)
    }
  }, [location.props])

  // close UI alert
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return // without closing
    }
    setIsAlert(false)
    setAlertMessage('')
  }

  return (
    <>
      <AlertBar
        on={isAlert}
        type={'info'}
        message={alertMessage}
        handleClose={handleClose}
      />
      <AccountForm routes={routes} />
    </>
  )
}

export default Login
