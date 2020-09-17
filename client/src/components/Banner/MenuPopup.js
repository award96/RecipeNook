import React from 'react'
import Grid from '@material-ui/core/Grid'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Avatar from '@material-ui/core/Avatar'

const RenderMenu = (props) => {
  const {
    classes,
    anchorEl,
    menuId,
    isMenuOpen,
    handleMenuClose,
    handleLogout,
    handleMyProfile,
    handleMyAccount,
    userpic,
  } = props

  return (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      transformOrigin={{vertical: -40, horizontal: 93}}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Grid container className={classes.menu} item xs={6}>
        <Avatar src={userpic} className={classes.menuAvatar} />
      </Grid>

      <MenuItem onClick={handleMyProfile}>Public Profile</MenuItem>
      <MenuItem onClick={handleMyAccount}>My Account</MenuItem>
      <MenuItem onClick={handleLogout}>Log Out</MenuItem>
    </Menu>
  )
}

export default RenderMenu
