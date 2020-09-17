import React from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'

const EmailPassword = (props) => {
  const {accountFormDispatch, accountFormState, createAccount} = props

  return (
    <>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus={!createAccount}
          value={accountFormState.emailField || ''}
          onChange={(e) =>
            accountFormDispatch({
              type: 'field',
              fieldName: 'emailField',
              payload: e.currentTarget.value,
            })
          }
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={accountFormState.passwordField || ''}
          onChange={(e) =>
            accountFormDispatch({
              type: 'field',
              fieldName: 'passwordField',
              payload: e.currentTarget.value,
            })
          }
        />
      </Grid>
      {createAccount ? (
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="passConfirmField"
            label="Confirm Password"
            type="password"
            id="passConfirmField"
            autoComplete="current-password"
            value={accountFormState.passConfirmField || ''}
            onChange={(e) =>
              accountFormDispatch({
                type: 'field',
                fieldName: 'passConfirmField',
                payload: e.currentTarget.value,
              })
            }
          />
        </Grid>
      ) : (
        <></>
      )}
    </>
  )
}

export default EmailPassword
