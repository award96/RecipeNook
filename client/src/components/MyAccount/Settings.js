import React from 'react'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import EditIcon from '@material-ui/icons/Edit'

const Settings = (props) => {
  let {
    classes,
    user,
    handleClick,
    handleSubmit,
    editSet,
    usernameVal,
    userpicVal,
    handleFormChange,
    submitting,
  } = props

  return (
    <Grid container className={classes.settingsRoot}>
      <List>
        <ListItem className={classes.usernameContainer}>
          {editSet.has('0') ? (
            <>
              <TextField
                variant="outlined"
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={usernameVal}
                onChange={handleFormChange}
              />
              <Button
                onClick={handleSubmit}
                name="submitUsername"
                value={usernameVal}
                disabled={submitting}
              >
                Submit
              </Button>
              <Button onClick={handleClick} name="cancelUsername" value={0}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h3">{user.username}</Typography>
              <IconButton onClick={handleClick} name="edit" value={0}>
                <EditIcon />
              </IconButton>
            </>
          )}
        </ListItem>
        <Divider variant="fullWidth" />
        <ListItem className={classes.emailContainer}>
          <Grid item xs={4}>
            <Typography variant="body2">{user.email}</Typography>
          </Grid>
        </ListItem>
        <Divider variant="fullWidth" />
        <ListItem className={classes.userpicContainer}>
          {editSet.has('1') ? (
            <>
              <TextField
                variant="outlined"
                id="userpic"
                label="Profile Picture"
                name="userpic"
                autoComplete="URL"
                autoFocus
                value={userpicVal}
                onChange={handleFormChange}
              />
              <Button
                onClick={handleSubmit}
                name="submitUserpic"
                value={userpicVal}
                disabled={submitting}
              >
                Submit
              </Button>
              <Button onClick={handleClick} name="cancelUserpic" value={1}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Avatar
                aria-label="userpic"
                className={classes.userpic}
                alt={user.username}
                src={user.userpic}
              />
              <Typography variant="body2">Avatar</Typography>
              <IconButton
                onClick={handleClick}
                name="edit"
                size="small"
                value={1}
              >
                <EditIcon />
              </IconButton>
            </>
          )}
        </ListItem>
        <Divider variant="fullWidth" />
        <ListItem className={classes.resetContainer}>
          <Button
            onClick={handleClick}
            name="resetPassword"
            className={classes.resetButton}
          >
            <Typography variant="body2">Reset Password</Typography>
          </Button>
        </ListItem>
      </List>
    </Grid>
  )
}

export default Settings
