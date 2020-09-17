import React from 'react'
import {Link} from 'react-router-dom'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import PersonCheckmarkIcon from './PersonCheckmarkIcon'
import {makeStyles} from '@material-ui/core/styles'

const iconButtonSize = '4rem'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  listItem: {
    backgroundColor: theme.palette.white.main,
  },
  userProfileLink: {
    textDecoration: 'none',
    color: theme.palette.black.main,
  },
  iconButton: {
    width: iconButtonSize,
    height: iconButtonSize,
  },
}))

const LinkList = (props) => {
  // added is a list of userIds
  const {data, handleClick, added, routes} = props

  const classes = useStyles()
  // map data to list items
  const ListItems = data.map((item, index) => {
    return (
      <div key={index}>
        <ListItem className={classes.listItem}>
          <ListItemAvatar>
            <Link
              className={classes.userProfileLink}
              to={routes.USER_PROFILE.split(':')[0] + item.username}
            >
              <Avatar
                aria-label="avatar"
                className={classes.avatar}
                alt={item.username}
                src={item.userpic}
              />
            </Link>
          </ListItemAvatar>
          <Link
            className={classes.userProfileLink}
            to={routes.USER_PROFILE.split(':')[0] + item.username}
          >
            <ListItemText primary={item.username} />
          </Link>

          <ListItemSecondaryAction>
            <IconButton
              onClick={() => {
                handleClick(item.respUserId)
              }}
              className={classes.iconButton}
            >
              {added && added.includes(item.respUserId) ? (
                <PersonCheckmarkIcon />
              ) : (
                <PersonAddIcon />
              )}
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        {index < data.length - 1 ? <Divider /> : <></>}
      </div>
    )
  })

  return <List className={classes.root}>{ListItems}</List>
}

export default LinkList
