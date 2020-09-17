import React from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import AccountCircle from '@material-ui/icons/AccountCircle'
import ForumIcon from '@material-ui/icons/Forum'
import FavoriteIcon from '@material-ui/icons/Favorite'
import MenuBookIcon from '@material-ui/icons/MenuBook'

const RenderNotifMenu = (props) => {
  const size = 20
  const {
    classes,
    anchorEl,
    menuId,
    isMenuOpen,
    handleMenuClose,
    notifications,
    handleClick,
  } = props

  // show the correct icon for the given notification type
  const iconMap = {
    follow: <AccountCircle color="inherit" style={{fontSize: size}} />,
    comment: <ForumIcon color="inherit" style={{fontSize: size}} />,
    favorite: <FavoriteIcon color="inherit" style={{fontSize: size}} />,
    followP: <MenuBookIcon color="inherit" style={{fontSize: size}} />,
  }
  // show the correct text for the given notification type
  const textMap = {
    follow: ' is now following you',
    comment: ' commented on your recipe',
    favorite: ' favorited your recipe',
    followP: ' posted a new recipe',
  }

  if (!notifications || notifications.length === 0) {
    return <></>
  }

  // map list of notification objects to MenuItems
  const displayNotifications = notifications.map((notif) => {
    let {kind, otherUsername, wasRead} = notif
    let text = otherUsername + textMap[kind]
    return (
      <MenuItem
        className={wasRead ? classes.readMenuItem : classes.menuItem}
        key={notif.id}
        style={{width: '100%', maxWidth: '20ch', whiteSpace: 'normal'}}
        alignItems="flex-start"
        onClick={() => handleClick(notif.id)}
      >
        <ListItemIcon
          style={
            wasRead
              ? {color: 'rgba(0, 0, 0, 0.26)', minWidth: '4ch'}
              : {minWidth: '4ch'}
          }
        >
          {iconMap[kind]}
        </ListItemIcon>
        <ListItemText secondary={text} />
        {/* display "unread dot" if unread */}
        {!wasRead && <p style={{color: '#2F416B'}}>●</p>}
      </MenuItem>
    )
  })

  return (
    <Menu
      className={classes.notifMenu}
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
      transformOrigin={{vertical: -40, horizontal: 93}}
    >
      {displayNotifications}
    </Menu>
  )
}
export {RenderNotifMenu}
