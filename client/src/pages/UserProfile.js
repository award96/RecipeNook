import React, {useState, useEffect, useContext} from 'react'
import {UserContext} from '../userContext'
import fetchUserSocial from '../API/fetchUserSocial'
import postFavorite from '../API/postFavorite'
import postFollow from '../API/postFollow'
import {useParams} from 'react-router-dom'
import {UserBanner, OneCard, LinkList, AlertBar} from '../components/index'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
  },
  bannerContainer: {
    margin: 0,
    width: '100%',
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  headerContainer: {
    marginLeft: theme.spacing(7.5),
    marginTop: theme.spacing(8),
  },
  recipeCardContainer: {
    marginLeft: theme.spacing(7.5),
    marginTop: theme.spacing(5),
    minHeight: '20rem',
  },
  followersGrid: {
    marginLeft: theme.spacing(7.5),
    minHeight: '20rem',
  },
  followSubtitle: {
    marginTop: theme.spacing(5),
    marginLeft: '8ch',
  },
  nothingGrid: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },
  nothing: {
    display: 'flex',
    alignSelf: 'center',
  },
}))

const UserProfile = (props) => {
  const {user} = useContext(UserContext) || ''
  const classes = useStyles()
  const {data, isLoaded, routes} = props

  // user who's profile this is
  const {username} = useParams()
  const [userId, setUserId] = useState()
  const [userpic, setUserpic] = useState('')
  const [followers, setFollowers] = useState()
  const [following, setFollowing] = useState()
  const [favorites, setFavorites] = useState()

  // user who's viewing this profile
  const [added, setAdded] = useState()
  const [favoritesAdded, setFavoritesAdded] = useState()
  const [isSocialLoaded, setIsSocialLoaded] = useState(false)
  // UI alert state
  const [isAlert, setIsAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState('warning')

  // load profile page user's data
  useEffect(() => {
    // get user Id and userpic
    const fetchUser = async () => {
      try {
        let response = await fetch(`/api/users/get/username/${username}`)
        let jsonResp = await response.json()

        setUserpic(jsonResp.userpic)
        setUserId(jsonResp.id)
        return jsonResp.id
      } catch (error) {
        setUserpic('')
        return null
      }
    }
    // using user Id get everything else
    const fetchSocial = async (userId) => {
      try {
        let socialDataObj = await fetchUserSocial(userId)

        setFollowers(socialDataObj.followers)
        setFollowing(socialDataObj.following)
        setFavorites(socialDataObj.favorites)
      } catch (error) {
        setFollowers([])
        setFollowing([])
        setFavorites([])
      }
    }
    // combine two steps
    const fetchAll = async () => {
      try {
        let userIdNum = await fetchUser()
        await fetchSocial(userIdNum)
      } catch (error) {}
    }

    fetchAll()
  }, [username, user])

  // load viewing user's data
  useEffect(() => {
    const fetchMySocial = async () => {
      try {
        let socialDataObj = await fetchUserSocial(user.id)
        setAdded(socialDataObj.following.map((item) => item.respUserId))
        setFavoritesAdded(
          socialDataObj.favorites.map((recipe) => recipe.recipeId),
        )
        setIsSocialLoaded(true)
      } catch (error) {
        setAdded([])
        setFavoritesAdded([])
      }
    }
    if (user) {
      fetchMySocial()
    }
  }, [user, username])

  // get profile page recipes from data already loaded into app
  const recipeArray = data.filter((recipe) => recipe.username === username)

  // show the profile page user's favorite recipes
  var favoritesArray
  if (favorites && isLoaded) {
    let favoritesIds = favorites.map((recipe) => recipe.recipeId)
    favoritesArray = data.filter((recipe) => favoritesIds.includes(recipe.id))
    // dont show favorites which are the user's own recipes
    // those are already on the same page under the recipes section
    favoritesArray = favoritesArray.filter((recipe) => recipe.userId !== userId)
  }

  // set UI alert
  const sendAlert = (alertObj) => {
    setIsAlert(true)
    setAlertMessage(alertObj.message)
    setAlertType(alertObj.type)
  }
  // close alert
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return // return without closing
    }

    setIsAlert(false)
    setAlertMessage('')
  }

  // click follow button on UserBanner
  const handleClick = async (e) => {
    if (user && userId) {
      if (userId === user.id) {
        sendAlert({message: 'You cannot follow yourself', type: 'warning'})
        return
      }

      let resp = await postFollow(userId, user.id, user.username)
      editAdded(resp, userId)
    } else {
      // not signed in
      sendAlert({
        message: 'Please sign in to follow this user',
        type: 'warning',
      })
    }
  }
  // either follow/unfollow or redirect to user profile page
  const handleLinkListClick = async (linkId) => {
    if (!isSocialLoaded) {
      // user might unfollow other user by accident
      return
    }
    if (user) {
      if (user.id === linkId) {
        // can't follow yourself
        sendAlert({message: 'You cannot follow yourself', type: 'warning'})
        return
      }

      let resp = await postFollow(linkId, user.id, user.username)
      editAdded(resp, linkId)
    } else {
      // not signed in
      sendAlert({
        message: 'Please sign in to follow this user',
        type: 'warning',
      })
    }
  }
  // state logic using postFollow response
  const editAdded = (resp, otherUsersId) => {
    if (resp.status === 200) {
      let newAdded = [...added]
      if (resp.message === 'created') {
        // follow
        newAdded.push(otherUsersId)
      } else {
        // unfollow
        let del_index = newAdded.findIndex((id) => id === otherUsersId)
        newAdded.splice(del_index, 1)
      }
      setAdded(newAdded)
    } else {
      // status indicates error
      sendAlert({
        message: 'Something went wrong, please refresh and try again',
        type: 'warning',
      })
    }
  }

  // copy link to clipboard, dependent on userProfile url
  const handleShare = (recipeId) => {
    sendAlert({
      message: 'Link copied to clipboard',
      type: 'success',
    })
    navigator.clipboard.writeText(
      window.location.href.split('/user-profile', 1)[0] +
        routes.RECIPE.split(':')[0] +
        recipeId,
    )
  }

  // post favorite
  const handleFavorite = async (recipeId, recipeUserId) => {
    if (!isSocialLoaded) {
      // user might unfavorite by accident
      return
    }
    if (user) {
      let resp = await postFavorite(
        recipeId,
        recipeUserId,
        user.id,
        user.username,
      )
      if (resp.status === 200) {
        let newFavoriteList = [...favoritesAdded]
        if (resp.message === 'created') {
          // favorited
          newFavoriteList.push(recipeId)
        } else {
          // unfavorited
          let del_index = newFavoriteList.findIndex((id) => id === recipeId)
          newFavoriteList.splice(del_index, 1)
        }
        setFavoritesAdded(newFavoriteList)
      } else {
        // error
        sendAlert({
          message: 'Something went wrong. Please refresh and try again',
          type: 'warning',
        })
      }
    } else {
      // not signed in
      sendAlert({
        message: 'Please sign in to favorite a recipe',
        type: 'warning',
      })
    }
  }

  let isUserAdded = Boolean(added && added.includes(userId))
  return (
    <Grid container className={classes.root}>
      <AlertBar
        on={isAlert}
        message={alertMessage}
        type={alertType}
        handleClose={handleClose}
      />
      <Grid container className={classes.bannerContainer}>
        <UserBanner
          username={username}
          userpic={userpic}
          handleClick={handleClick}
          isAdded={isUserAdded}
          totalRecipes={recipeArray.length}
          totalFollowers={followers ? followers.length : 0}
          isSocialLoaded={isSocialLoaded}
        />
      </Grid>
      <Grid container className={classes.headerContainer}>
        <Typography variant="h3">Recipes</Typography>
      </Grid>
      <Grid
        item
        container
        className={classes.recipeCardContainer}
        xs={12}
        spacing={8}
      >
        {isLoaded ? (
          recipeArray.length > 0 ? (
            recipeArray.map((recipe) => (
              <Grid item key={recipe.id}>
                <OneCard
                  recipe={recipe}
                  small
                  handleFavorite={handleFavorite}
                  handleShare={handleShare}
                  isFavorited={
                    favoritesAdded ? favoritesAdded.includes(recipe.id) : false
                  }
                  routes={routes}
                />
              </Grid>
            ))
          ) : (
            <Grid item xs={6} className={classes.nothingGrid}>
              <Typography variant="body1" className={classes.nothing}>
                Nothing to show
              </Typography>
            </Grid>
          )
        ) : (
          <></>
        )}
      </Grid>
      <Grid item xs={12} sm={4} className={classes.followersGrid}>
        <Grid container className={classes.followersHeaderContainer}>
          <Typography variant="h3">Followers</Typography>
        </Grid>
        <Grid container className={classes.followersContainer}>
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
      </Grid>
      <Grid item xs={12} sm={4} className={classes.followersGrid}>
        <Grid container className={classes.followingHeaderContainer}>
          <Typography variant="h3">Following</Typography>
        </Grid>
        <Grid container className={classes.followingContainer}>
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
      </Grid>
      <Grid container className={classes.headerContainer}>
        <Typography variant="h3">Favorite Recipes</Typography>
      </Grid>
      <Grid
        item
        container
        className={classes.recipeCardContainer}
        xs={12}
        spacing={8}
      >
        {favoritesArray ? (
          favoritesArray.length > 0 ? (
            favoritesArray.map((recipe) => (
              <Grid item key={recipe.id}>
                <OneCard
                  recipe={recipe}
                  small
                  handleFavorite={handleFavorite}
                  handleShare={handleShare}
                  isFavorited={
                    favoritesAdded ? favoritesAdded.includes(recipe.id) : false
                  }
                  routes={routes}
                />
              </Grid>
            ))
          ) : (
            <Grid item xs={6} className={classes.nothingGrid}>
              <Typography variant="body1" className={classes.nothing}>
                Nothing to show
              </Typography>
            </Grid>
          )
        ) : (
          <></>
        )}
      </Grid>
    </Grid>
  )
}

export default UserProfile
