import React from 'react'
import {Link} from 'react-router-dom'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Badge from '@material-ui/core/Badge'
import AccountCircle from '@material-ui/icons/AccountCircle'
import NotificationsIcon from '@material-ui/icons/Notifications'

// render if user logged in
const LoggedInUserMenuBar = ({props}) => {
  const {
    notifications,
    handleNotifications,
    menuId,
    handleProfileMenuOpen,
  } = props

  // number of new notifications (red number on bell icon)
  let notifDisplayNum = 0
  if (notifications) {
    let unread = notifications.filter((item) => !item.wasRead)
    notifDisplayNum = unread.length
  }

  return (
    <>
      <IconButton
        aria-label="show notifications"
        aria-haspopup="true"
        color="inherit"
        onClick={handleNotifications}
      >
        <Badge badgeContent={notifDisplayNum} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
    </>
  )
}
// render if user logged out
const LoggedOutUserMenuBar = ({props}) => {
  const {classes, routes} = props

  return (
    <>
      <Container className={classes.logInContainer}>
        <Grid container className={classes.logInIconContainer}>
          <AccountCircle className={classes.logInIcon} />
        </Grid>
        <Grid container className={classes.logInButtonContainer}>
          <Link to={routes.LOGIN} style={{textDecoration: 'none'}}>
            <Button className={classes.logInButton} style={{color: '#f5f5f5'}}>
              Log In
            </Button>
          </Link>
        </Grid>
      </Container>

      <Grid container className={classes.createContainer}>
        <Link to={routes.CREATE_ACCOUNT} style={{textDecoration: 'none'}}>
          <Button variant="contained" className={classes.create}>
            <Typography variant="caption" className={classes.createText}>
              Create Account
            </Typography>
          </Button>
        </Link>
      </Grid>
    </>
  )
}

const UserMenuBar = (props) => {
  const {isLoggedIn} = props

  if (isLoggedIn) {
    return <LoggedInUserMenuBar props={props} />
  }

  // else
  return <LoggedOutUserMenuBar props={props} />
}

export default UserMenuBar
