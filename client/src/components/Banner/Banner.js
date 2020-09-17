import React, {useState, useContext, useEffect} from 'react'
import {UserContext} from '../../userContext'
import {WindowSizeContext} from '../../windowSizeContext'
import {handleUserAuth} from '../../firebase'
import Searchbar from './Searchbar'
import {Link, useHistory} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import SearchIcon from '@material-ui/icons/Search'

import useBannerStyles from './useBannerStyles'
import ButtonCreateRecipe from './ButtonCreateRecipe'
import UserMenuBar from './UserMenuBar'
import RenderMenu from './MenuPopup'
import {RenderNotifMenu} from './NotifMenuPopup'

const Banner = ({routes}) => {
  // state management
  const classes = useBannerStyles()
  // anchor for user profile menu
  const [anchorEl, setAnchorEl] = useState(null)
  // anchor for notification menu
  const [notifAnchorEl, setNotifAnchorEl] = useState(null)

  // what's in the search bar and what's being displayed
  const [search, setSearch] = useState('')
  const [display, setDisplay] = useState()
  // notification objects
  const [notifications, setNotifications] = useState([])
  // user
  const {user} = useContext(UserContext) || ''
  const isLoggedIn = user ? true : false
  // window size
  const {size} = useContext(WindowSizeContext) || [0, 0]
  // used to push routes on click
  var history = useHistory()
  // fetch search results
  useEffect(() => {
    if (!search || search === '') {
      setDisplay(null)
      return
    }
    const getSearchResults = async () => {
      let response = await fetch(`/api/recipes/search/${search}`)
      let respData = await response.json()
      setDisplay(respData)
    }
    getSearchResults()
  }, [search])
  // fetch notifications
  useEffect(() => {
    if (user && user.notifications) {
      setNotifications(user.notifications)
    }
  }, [user])

  // if anchored open menu
  const isMenuOpen = Boolean(anchorEl)
  const isNotifOpen = Boolean(notifAnchorEl)
  // open profile menu
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }
  // open the menu and tell server notifications have been viewed
  const handleNotifications = async (event) => {
    setNotifAnchorEl(event.currentTarget)

    if (user && user.notifications) {
      // tell server the user has seen the notifications
      await fetch('/api/users/social/viewNotif', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          notifIdArray: user.notifications.map((notif) => notif.id),
        }),
      })
    }
  }
  // push route based on what notification was clicked
  const handleNotifClick = (id) => {
    let thisNotif = notifications.filter((item) => item.id === id)[0]

    var pushLink = routes.USER_PROFILE.split(':')[0] + thisNotif.otherUsername
    if (thisNotif.kind !== 'follow') {
      pushLink = routes.RECIPE.split(':')[0] + thisNotif.recipeId
    }
    history.push(pushLink)
    let notifCopy = [...notifications]
    notifCopy = notifCopy.map((notif) => {
      if (notif.id !== id) {
        return notif
      }
      notif.wasRead = true
      return notif
    })
    setNotifications(notifCopy)
  }
  // push route based on what search result was clicked
  const handleSearchClick = (id) => {
    history.push(routes.RECIPE.split(':')[0] + id)
    handleSearchClose()
  }
  // log the user out and close the menu
  const handleLogout = () => {
    handleUserAuth({type: 'logout'})
    handleMenuClose()
  }
  // push route to user's public profile
  const handleMyProfile = () => {
    history.push(routes.USER_PROFILE.split(':')[0] + user.username)
    handleMenuClose()
  }
  // pushe route to user's account settings
  const handleMyAccount = () => {
    history.push(routes.MY_ACCOUNT)
    handleMenuClose()
  }
  // close user menu
  const handleMenuClose = () => {
    setAnchorEl(null)
  }
  // close notifications menu and set notifications to 'wasRead'
  // without making API request
  const handleNotifClose = () => {
    setNotifAnchorEl(null)

    let notifCopy = [...notifications]
    notifCopy.forEach((item) => {
      item.wasRead = true
      return item
    })
    setNotifications(notifCopy)
  }
  // close search results
  const handleSearchClose = () => {
    setDisplay(null)
  }

  const menuId = 'primary-search-account-menu'
  const notifMenuId = 'notification-menu'
  const searchMenuId = 'search-menu'

  let isMobile = size && size[0] < 500
  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <Link to={routes.RECIPE_CARDS} style={{textDecoration: 'none'}}>
            <Typography className={classes.menuTitle} variant="h6" noWrap>
              RecipeNook
            </Typography>
          </Link>
          {
            // don't show searchbar on mobile
            !isMobile && (
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <Searchbar
                  classes={classes}
                  setSearch={setSearch}
                  search={search}
                  display={display}
                  menuId={searchMenuId}
                  handleClick={handleSearchClick}
                  handleSearchClose={handleSearchClose}
                />
              </div>
            )
          }

          <ButtonCreateRecipe
            classes={classes}
            isMobile={isMobile}
            routes={routes}
          />
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <UserMenuBar
              isLoggedIn={isLoggedIn}
              classes={classes}
              notifications={notifications}
              menuId={menuId}
              handleNotifications={handleNotifications}
              handleProfileMenuOpen={handleProfileMenuOpen}
              routes={routes}
            />
          </div>
        </Toolbar>
      </AppBar>
      <RenderMenu
        classes={classes}
        anchorEl={anchorEl}
        menuId={menuId}
        isMenuOpen={isMenuOpen}
        handleMenuClose={handleMenuClose}
        handleLogout={handleLogout}
        handleMyProfile={handleMyProfile}
        handleMyAccount={handleMyAccount}
        userpic={user ? user.userpic : ''}
      />
      <RenderNotifMenu
        classes={classes}
        anchorEl={notifAnchorEl}
        menuId={notifMenuId}
        isMenuOpen={isNotifOpen}
        handleMenuClose={handleNotifClose}
        notifications={notifications}
        handleClick={handleNotifClick}
      />
    </div>
  )
}

export default Banner
