import React, {useContext, useReducer} from 'react'
import {auth, handleUserAuth} from '../../firebase'
import {UserContext} from '../../userContext'
import {useStyles, Alert} from './FunctionsAccountForm'
import usernamePasswordValidation from '../Shared/usernamePasswordValidation'
import Username from './Username'
import EmailPassword from './EmailPassword'
import {Link, Redirect} from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@material-ui/core/TextField'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

const AccountForm = (props) => {
  const {createAccount, routes} = props // boolean: create account or log in?
  const classes = useStyles()
  const {user} = useContext(UserContext) || ''
  const isLoggedIn = user ? true : false

  // Form and UI Alert state
  // not involved in backend auth whatsoever, only for user experience

  const initialaccountFormState = {
    nameField: '',
    emailField: '',
    passwordField: '',
    passConfirmField: '',
    isLoading: false,
    error: false,
    errorMessage: '',
    errorType: 'warning',
    isDialogue: false,
    dialogueField: '',
  }

  const accountFormReducer = (state, action) => {
    switch (action.type) {
      case 'field': {
        return {
          // user types in text field
          ...state,
          [action.fieldName]: action.payload,
        }
      }
      case 'loginAttempt': {
        return {
          // user tries to log in/create account
          ...state,
          error: false,
          isLoading: true,
        }
      }
      case 'success': {
        return {
          // login/create was successful
          ...state,
          errorType: 'success',
          errorMessage: action.message || '',
          error: true,
          isLoading: false,
        }
      }
      case 'failure': {
        return {
          // login/create was not successful
          ...state,
          error: true,
          isLoading: false,
          errorMessage: action.errorMessage,
        }
      }
      case 'closeError': {
        return {
          // close UI alert
          ...state,
          error: false,
        }
      }
      case 'toggleDialogue': {
        return {
          // open dialogue
          ...state,
          isDialogue: !state.isDialogue,
        }
      }
      case 'dialogueAutoFill': {
        return {
          // autofill email field
          ...state,
          dialogueField: state.emailField,
        }
      }
      default: {
        // should never happen
        return state
      }
    }
  }

  const [accountFormState, accountFormDispatch] = useReducer(
    accountFormReducer,
    initialaccountFormState,
  )

  // Functions & backend authentication

  // call firebase function 'handleUserAuth' and then error handle
  const accountFunc = async (authObject) => {
    let response = await handleUserAuth(authObject)
    // if the sign in is successful it will automatically redirect
    if (response.errorCode) {
      var errorMessage = 'Email or Password are Incorrect'
      if (response.errorCode === 'auth/email-already-in-use') {
        errorMessage = 'Email already in use'
      }
      throw new Error(errorMessage)
    }
  }

  // close UI alert
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return // return without closing
    }
    accountFormDispatch({type: 'closeError'})
  }
  // open dialogue
  const handleOpenDialogue = () => {
    accountFormDispatch({type: 'dialogueAutoFill'})
    accountFormDispatch({type: 'toggleDialogue'})
  }
  //  close dialogue
  const handleCloseDialogue = () => {
    accountFormDispatch({type: 'toggleDialogue'})
  }
  // send password reset email
  const handleForgotPassword = () => {
    accountFormDispatch({type: 'loginAttempt'}) // set isLoading to true
    auth
      .sendPasswordResetEmail(accountFormState.dialogueField)
      .then(function () {
        accountFormDispatch({
          type: 'success',
          message: 'Password reset email sent',
        })
      })
      .then(function () {
        handleCloseDialogue() // close if successful
      })
      .catch(function (error) {
        let errorMessage = 'Something went wrong, please refresh and try again'
        if (error.code === 'auth/user-not-found') {
          errorMessage = 'There is no user with that email'
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'That is not a valid email'
        }

        accountFormDispatch({type: 'failure', errorMessage})
      })
  }

  // coordinate UI and API on submit login/create account
  const handleSubmit = async (e) => {
    e.preventDefault()

    accountFormDispatch({type: 'loginAttempt'})

    try {
      let authObject = {
        type: 'login', // assume login then change later
        email: accountFormState.emailField,
        password: accountFormState.passwordField,
        username: accountFormState.nameField,
      }
      if (createAccount) {
        authObject.type = 'create'
        // badInput is empty string if username & password are valid
        const badInput = usernamePasswordValidation(
          accountFormState.nameField,
          accountFormState.passwordField,
          accountFormState.passConfirmField,
          true,
        )
        // check if username is in use already, so long as user entered input
        let usernameResponse, usernameData
        if (accountFormState.nameField) {
          usernameResponse = await fetch(
            `/api/users/check/${accountFormState.nameField}`,
          )
          // usernameData empty if no matching username
          usernameData = await usernameResponse.json()
        }

        const isNameAvail = usernameData && usernameData.length === 0

        if (badInput) {
          // the username/password were invalid
          accountFormDispatch({type: 'failure', errorMessage: badInput})
          return
        } else if (!isNameAvail) {
          // the username is already in use
          accountFormDispatch({
            type: 'failure',
            errorMessage: 'That username is already taken',
          })
          return
        }
      }

      await accountFunc(authObject) // redirects user automatically
      accountFormDispatch({type: 'success'})
    } catch (error) {
      console.log('Error in handleSubmit')
      accountFormDispatch({type: 'failure', errorMessage: error.message})
    }
  }

  if (isLoggedIn) {
    return <Redirect to="/" />
  }
  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <Snackbar
        open={accountFormState.error}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={accountFormState.errorType}>
          {accountFormState.errorMessage}
        </Alert>
      </Snackbar>
      <Dialog
        open={accountFormState.isDialogue}
        onClose={handleCloseDialogue}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Enter your email to reset your password
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            id="forgotPassword"
            label="email"
            variant="outlined"
            margin="dense"
            fullWidth
            value={accountFormState.dialogueField}
            onChange={(e) =>
              accountFormDispatch({
                type: 'field',
                fieldName: 'dialogueField',
                payload: e.currentTarget.value,
              })
            }
            disabled={accountFormState.isLoading}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialogue}
            disabled={accountFormState.isLoading}
          >
            Cancel
          </Button>
          <Button
            className={classes.buttonDelete}
            variant="contained"
            onClick={handleForgotPassword}
            disabled={accountFormState.isLoading}
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          {createAccount ? 'Sign up' : 'Sign in'}
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            {createAccount ? (
              <Username
                accountFormDispatch={accountFormDispatch}
                accountFormState={accountFormState}
                className={classes.formField}
              />
            ) : (
              <></>
            )}
            <EmailPassword
              accountFormDispatch={accountFormDispatch}
              accountFormState={accountFormState}
              createAccount={createAccount}
              className={classes.formField}
            />
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={accountFormState.isLoading}
            onClick={handleSubmit}
          >
            {createAccount ? 'Sign up' : 'Sign in'}
          </Button>
          <Grid container>
            <Grid item xs>
              <div onClick={handleOpenDialogue} className={classes.routerLink}>
                <Typography variant="body2">Forgot password?</Typography>
              </div>
            </Grid>
            <Grid item>
              <Link
                to={createAccount ? routes.LOGIN : routes.CREATE_ACCOUNT}
                variant="body2"
                className={classes.routerLink}
              >
                {createAccount
                  ? 'Already have an account? Sign in'
                  : "Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

export default AccountForm
