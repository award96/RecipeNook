import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

const AlertBar = (props) => {
  // Parent state determines alert.
  // AutoHideDuration could easily be prop.
  // Whether clickaway closes alert or not is set
  // by parent function "handleClose"
  let {on, message, type, handleClose} = props
  // copied from MUI docs, only sets elevation and variant
  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />
  }

  return (
    <Snackbar open={on} autoHideDuration={4000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default AlertBar
