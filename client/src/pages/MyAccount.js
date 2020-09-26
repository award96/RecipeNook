import React, {useState, useContext, useEffect} from 'react'
import {UserContext} from '../userContext'
import {auth} from '../firebase'
import {Redirect, useLocation} from 'react-router-dom'
import fetchUserSocial from '../API/fetchUserSocial'
import postFavorite from '../API/postFavorite'
import postFollow from '../API/postFollow'
import checkIfUsernameAvail from '../API/checkIfUsernameAvail'
import updateUserRequest from '../API/updateUserRequest'
import {
  AccountTabs,
  Settings,
  MyRecipes,
  AlertBar,
  OneCard,
  LinkList,
  usernamePasswordValidation,
} from '../components/index'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'

const marginL = '1rem'
const paddingSpacing = 5
const minHeight = '40rem'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  settingsRoot: {
    marginTop: '1rem',
    marginLeft: marginL,
    minHeight: minHeight,
  },
  favoritesRoot: {
    marginTop: '6rem',
    paddingLeft: '2rem',
    minHeight: minHeight,
    justifySelf: 'center',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '8rem',
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: '16rem',
    },
  },
  followingRoot: {
    justifyContent: 'center',
    marginTop: '3rem',
    minHeight: minHeight,
    paddingLeft: '5%',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '25%',
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: '50%',
    },
  },
  followersRoot: {
    justifyContent: 'center',
    marginTop: '3rem',
    minHeight: minHeight,
    paddingLeft: '5%',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '50%',
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: '60%',
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: '75%',
    },
  },
  usernameContainer: {
    display: 'flex',
    padding: theme.spacing(paddingSpacing),
  },
  emailContainer: {
    padding: theme.spacing(paddingSpacing),
  },
  userpicContainer: {
    padding: theme.spacing(paddingSpacing),
  },
  resetContainer: {
    padding: theme.spacing(paddingSpacing),
  },
  userpic: {
    marginRight: theme.spacing(1),
  },
  resetButton: {
    textTransform: 'none',
    fontSize: 'inherit',
  },
  nothingGrid: {
    minHeight: minHeight,
    marginTop: '3rem',
    marginLeft: '25%',
    display: 'flex',
    justifyContent: 'center',
  },
}))

const MyAccount = (props) => {
  let {user, updateUserContext} = useContext(UserContext) || ''

  const {data, isLoaded, routes, reloadData} = props
  const classes = useStyles()

  // user data state
  const [favorites, setFavorites] = useState()
  const [followers, setFollowers] = useState()
  const [following, setFollowing] = useState()
  const [added, setAdded] = useState()

  // was user redirected here to add  userpic?
  const location = useLocation()

  // always set these two in conjunction
  // added is just the user Id of the other user
  const setFollowingSetAdded = (newFollowing) => {
    setFollowing(newFollowing)
    setAdded(newFollowing.map((item) => item.respUserId))
  }
  // tabs: settings & recipes, favorites, following, followers
  const [activeTab, setActiveTab] = useState(0)

  // what are you editing on the settings tab
  const [editSet, setEditSet] = useState(new Set())
  // what are the values of editable fields
  const [usernameVal, setUsernameVal] = useState('')
  const [userpicVal, setUserpicVal] = useState('')
  // used to disable buttons/actions
  const [submitting, setSubmitting] = useState(false)

  // UI alert state
  const [alertOn, setAlertOn] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState('success')

  // load in user data, & focus on userpic if redirected here
  // to add userpic
  useEffect(() => {
    const fetchSocial = async () => {
      try {
        let socialDataObj = await fetchUserSocial(user.id)
        setFollowers(socialDataObj.followers)
        setFollowingSetAdded(socialDataObj.following)
        setFavorites(socialDataObj.favorites)
      } catch (error) {
        setFollowers([])
        setFollowingSetAdded([])
        setFavorites([])
      }
    }
    // if you were directed here to set your picture
    // autofocus on editing user picture
    if (location.props && location.props.wasRedirected) {
      setEditSet(({oldSet}) => new Set(oldSet).add('1'))
      location.props = null
    }

    if (user) {
      fetchSocial()
    }
  }, [user, location.props])

  // change active tab
  const handleChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  // handle different types of clicks (reset, cancel, edit)
  const handleClick = (e) => {
    let type = e.currentTarget.name
    // send a "reset password" email
    if (type.startsWith('reset')) {
      auth
        .sendPasswordResetEmail(user.email)
        .then(function () {
          sendAlert({
            alert: `An email has been sent to ${user.email}`,
            type: 'success',
          })
        })
        .catch(function (error) {
          sendAlert({
            alert:
              'There was a problem resetting your password, please refresh and try again',
            type: 'warning',
          })
        })
    } else if (type.startsWith('cancel')) {
      // no longer editing that field
      let newEditSet = editSet

      if (editSet.has(e.currentTarget.value)) {
        newEditSet = new Set(newEditSet.values())
        newEditSet.delete(e.currentTarget.value)
      }
      setEditSet(newEditSet)
    }
    // editing new field
    else setEditSet(({oldSet}) => new Set(oldSet).add(e.currentTarget.value))
  }
  // handle click to list of followers/following
  // can either follow/unfollow or redirect to other user's page
  const handleLinkListClick = async (linkId) => {
    if (user) {
      if (user.id === linkId) {
        sendAlert({alert: 'You cannot follow yourself', type: 'warning'})
        return
      }
      // could be follow or unfollow, server resp decides
      let resp = await postFollow(linkId, user.id, user.username)
      if (resp.ok) {
        var newFollowing = [...following]
        let del_index = following.findIndex(
          (item) => item.respUserId === linkId,
        )
        if (del_index === -1) {
          // posted follow
          // unique to the LinkList component, we know that any newly followed user
          // will have been present in the followers array.

          let add_index = followers.findIndex(
            (item) => item.respUserId === linkId,
          )
          newFollowing.push(followers[add_index])
        } else {
          // posted unfollow

          newFollowing.splice(del_index, 1)
        }
        setFollowingSetAdded(newFollowing)
        return
      } else {
        // status was not ok
        sendAlert({
          alert: 'Something went wrong, please refresh and try again',
          type: 'warning',
        })
      }
    } else {
      // there is no user signed in
      sendAlert({alert: 'Please sign in to follow this user', type: 'warning'})
    }
  }
  // can only unfavorite because this is the user's page of favorites
  // user's own recipes under settings are not favoritable from this view
  const handleFavorite = async (recipeId, recipeUserId) => {
    let resp = await postFavorite(recipeId, recipeUserId, user.id)
    if (!resp.ok) {
      sendAlert({
        alert: 'Something went wrong. Please refresh and try again',
        type: 'warning',
      })
      return
    }
    // can only unfavorite because this is the user's page of favorites
    setFavorites((prevFavorites) => {
      let del_index = prevFavorites.findIndex(
        (favorite) => favorite.recipeId === recipeId,
      )
      prevFavorites.splice(del_index, 1)
      return [...prevFavorites]
    })
  }
  // copy link to recipe to user clipboard
  const handleShare = (recipeId) => {
    sendAlert({alert: 'Link copied to clipboard', type: 'success'})
    navigator.clipboard.writeText(
      window.location.href.split('/my-account', 1)[0] +
        routes.RECIPE.split(':')[0] +
        recipeId,
    )
  }
  // update username or userpic
  const handleSubmit = (e) => {
    let type = e.currentTarget.name
    setSubmitting(true)
    if (type.endsWith('Username')) {
      submitUsername() // after checking username availabilty
    } //                  calls updateUserProfile('username')
    else if (type.endsWith('Userpic')) {
      updateUserProfile('userpic')
    } else {
      sendAlert({
        alert: 'Something went wrong, please refresh and try again',
        type: 'warning',
      })
      setSubmitting(false)
    }
  }
  // checks if username is valid before calling updateUserProfile
  const submitUsername = async () => {
    let badInput = usernamePasswordValidation(usernameVal)
    if (badInput) {
      // does not meet requirements for a username
      sendAlert({alert: badInput, type: 'warning'})
      return
    }
    let isNameAvail = checkIfUsernameAvail(usernameVal)
    if (!isNameAvail) {
      sendAlert({alert: 'Username is already in use', type: 'warning'})
      setSubmitting(false)
      return
    }

    updateUserProfile('username')
  }
  // sends post request to update user profile
  const updateUserProfile = async (field) => {
    let value = field === 'username' ? usernameVal : userpicVal
    let updateUserBody = {
      type: field,
      id: user.id,
      value,
    }
    let updateUser = await updateUserRequest(updateUserBody)
    if (updateUser.status === 201) {
      sendAlert({alert: `${field} successfully changed`, type: 'success'})
      updateUserContext({type: field, value})
      // remove submitted field from edit set
      let fieldNum = field === 'username' ? '0' : '1'
      let newEditSet = editSet

      if (editSet.has(fieldNum)) {
        newEditSet = new Set(newEditSet.values())
        newEditSet.delete(fieldNum)
        setEditSet(newEditSet)
      }
    } else {
      let alert = 'Something went wrong, please refresh and try again'
      if (
        updateUser &&
        updateUser.message &&
        updateUser.message.errno === 1366
      ) {
        alert = 'There is a non-supported character in your username'
      }
      sendAlert({alert: alert, type: 'warning'})
    }
    setSubmitting(false)
  }

  // updates form based on event
  const handleFormChange = (e) => {
    if (e.currentTarget.name === 'username') {
      setUsernameVal(e.currentTarget.value)
    } else if (e.currentTarget.name === 'userpic') {
      setUserpicVal(e.currentTarget.value)
    }
  }
  // set UI alert
  const sendAlert = (alertObject) => {
    setAlertOn(true)
    setAlertMessage(alertObject.alert)
    setAlertType(alertObject.type)
  }
  // close UI alert
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return // without closing
    }

    setAlertOn(false)
    setAlertMessage('')
  }

  if (!user) {
    return <Redirect to={routes.RECIPE_CARDS} />
  }

  // take API response data and map objects to integers (id #s)
  // then take app recipe data and filter out unfavorited recipes
  var favoritesArray
  if (favorites && isLoaded) {
    let favoritesIds = favorites.map((recipe) => recipe.recipeId)
    favoritesArray = data.filter((recipe) => favoritesIds.includes(recipe.id))
  }

  return (
    <>
      <AlertBar
        on={alertOn}
        message={alertMessage}
        type={alertType}
        handleClose={handleClose}
      />
      <AccountTabs
        classes={classes}
        activeTab={activeTab}
        handleChange={handleChange}
      />
      {activeTab === 0 && (
        <>
          <Grid container>
            <Grid item xs={12} sm={6} md={4}>
              <Settings
                classes={classes}
                user={user}
                handleClick={handleClick}
                handleSubmit={handleSubmit}
                editSet={editSet}
                usernameVal={usernameVal}
                userpicVal={userpicVal}
                handleFormChange={handleFormChange}
                sumbitting={submitting}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <MyRecipes
                user={user}
                data={data}
                isLoaded={isLoaded}
                sendAlert={sendAlert}
                routes={routes}
                reloadData={reloadData}
              />
            </Grid>
          </Grid>
        </>
      )}
      {activeTab === 1 && favoritesArray ? (
        favoritesArray.length > 0 ? (
          <Grid
            item
            container
            className={classes.favoritesRoot}
            spacing={8}
            xs={12}
          >
            {favoritesArray.map((recipe) => (
              <Grid key={recipe.id} item>
                <OneCard
                  isFavorited
                  handleFavorite={handleFavorite}
                  handleShare={handleShare}
                  recipe={recipe}
                  small
                  routes={routes}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid item xs={3} className={classes.nothingGrid}>
            <Typography variant="body1" className={classes.nothing}>
              Nothing to show
            </Typography>
          </Grid>
        )
      ) : (
        <></>
      )}

      {activeTab === 2 && (
        <Grid
          item
          container
          xs={12}
          sm={10}
          md={9}
          className={classes.followingRoot}
        >
          {following && following.length > 0 ? (
            <LinkList
              data={following || []}
              handleClick={handleLinkListClick}
              added={added}
              routes={routes}
            />
          ) : (
            <Typography variant="subtitle1" className={classes.followSubtitle}>
              Nothing to show
            </Typography>
          )}
        </Grid>
      )}
      {activeTab === 3 && (
        <Grid item container xs={12} className={classes.followersRoot}>
          {followers && followers.length > 0 ? (
            <LinkList
              data={followers || []}
              handleClick={handleLinkListClick}
              added={added}
              routes={routes}
            />
          ) : (
            <Typography variant="subtitle1" className={classes.followSubtitle}>
              Nothing to show
            </Typography>
          )}
        </Grid>
      )}
    </>
  )
}

export default MyAccount
