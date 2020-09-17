import React from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'

const Username = (props) => {
  const {accountFormDispatch, accountFormState} = props

  return (
    <Grid item xs={12}>
      <TextField
        variant="outlined"
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
        autoFocus
        value={accountFormState.nameField || ''}
        onChange={(e) =>
          accountFormDispatch({
            type: 'field',
            fieldName: 'nameField',
            payload: e.currentTarget.value,
          })
        }
      />
    </Grid>
  )
}
export default Username
