import React, {useState, useEffect, useContext} from 'react'
import {UserContext} from '../userContext'
import fetchUserFavorites from '../API/fetchUserFavorites'
import editArray from '../components/Shared/editArray'
import {Link} from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'
import {HeaderRecipes, OneCard, AlertBar} from '../components/index'
import postFavorite from '../API/postFavorite'

const paddingSize = '6rem'
const paddingSizeXS = '1.5rem'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '0rem',
    minHeight: '35rem',
    [theme.breakpoints.up('lg')]: {
      minHeight: '100rem',
    }
  },
  headerContainer: {
    width: '100%',
    marginBottom: '5rem',
  },
  headerItem: {
    width: '100%',
  },
  headerRoot: {
    width: '100%',
    maxHeight: '18rem',
    justifyContent: 'center',
    backgroundColor: theme.palette.white.offWhite,
  },
  headerFloat: {
    justifyContent: 'center',
  },
  headerButton: {
    textTransform: 'none',
    width: 'auto',
    height: '2rem',
  },
  headerTitle: {
    marginTop: '0rem',
    marginBottom: '0rem',
    alignSelf: 'center',
  },
  headerCardRoot: {
    maxWidth: 2800,
    paddingLeft: '2rem',
    height: '13rem',
    maxHeight: '13rem',
    justifyContent: 'space-between',
  },
  headerCard: {
    backgroundColor: 'inherit',
    shadow: 'none',
    height: '13rem',
    width: '18%',
    maxHeight: '13rem',
    maxWidth: 325,
  },
  headerLink: {
    textDecoration: 'none',
    color: 'inherit',
    marginBottom: 0,
  },
  headerRating: {
    height: '0.5rem',
  },
  headerImg: {
    alignSelf: 'flex-end',
    height: '9rem',
    maxWidth: '95%',
    margin: '0 auto',
    marginTop: '1rem',
  },
  cardRoot: {
    justifyContent: 'start',
    paddingLeft: paddingSizeXS,
    paddingRight: 0,
    [theme.breakpoints.up('sm')]: {
      paddingLeft: paddingSize,
      paddingRight: paddingSize,
    },
    maxWidth: 2800,
  },
}))

// sorting algs

// avg rating and number of ratings
const bestSort = (x) => {
  if (x.countStars > 0) {
    return x.stars * (2 + Math.log(x.countStars))
  } else {
    return -1
  }
}
// newest
const newSort = (x) => {
  return x.updated
}
// avg rating only
const topSort = (x) => {
  return x.stars
}
// sort recipes for header display
const sortRecipes = (array, method) => {
  let sorted = [...array]
  sorted.sort((a, b) => {
    let a_val = method(a)
    let b_val = method(b)

    if (a_val < b_val) {
      return 1
    }
    if (a_val > b_val) {
      return -1
    }
    return 0
  })
  if (sorted.length > 5) {
    sorted.length = 5
  }
  return sorted
}

const RecipeCards = (props) => {
  let {user, updateUserContext} = useContext(UserContext) || ''

  const classes = useStyles()
  var {data, isLoaded, routes} = props
  // how to sort header recipes
  const [sortBy, setSortBy] = useState('b') // b: best, n: new, t: top rated
  // header recipes
  const [headerRecipes, setHeaderRecipes] = useState([])
  // user's favorite recipes
  const [favoriteList, setFavoriteList] = useState([])
  // UI alert state
  const [isAlert, setIsAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState('warning')

  // load user data
  useEffect(() => {
    const getUserFavorites = async () => {
      let respJson = await fetchUserFavorites(user.id)
      setFavoriteList(respJson.map((favoriteRecipe) => favoriteRecipe.recipeId))
    }
    if (user) {
      // check whether to send alert
      if (user.shouldSetPic) {
        // tell user to set their userpic
        sendAlert({
          alert: (
            <Link
              style={{color: 'white'}}
              to={{
                pathname: routes.MY_ACCOUNT,
                props: {wasRedirected: true},
              }}
            >
              Click here to set your avatar pic!
            </Link>
          ),
          type: 'info',
        })
        // only alert user once per visit
        updateUserContext({type: 'shouldSetPic', value: false})
      }
      getUserFavorites()
    } else {
      // not signed in
      setFavoriteList([])
    }
  }, [user])

  // setHeaderRecipes when sortBy or isLoaded changes
  useEffect(() => {
    let methodMap = {
      b: bestSort,
      n: newSort,
      t: topSort,
    }

    setHeaderRecipes(sortRecipes(data, methodMap[sortBy]))
  }, [sortBy, isLoaded, data])

  // change sort by algorithm
  const handleClick = (e) => {
    setSortBy(e.currentTarget.value)
  }
  // either favorite or unfavorite then update UI
  const handleFavorite = async (recipeId, recipeUserId) => {
    if (user) {
      let resp = await postFavorite(
        recipeId,
        recipeUserId,
        user.id,
        user.username,
      )

      if (resp.ok) {
        // success
        setFavoriteList((prevList) => editArray(prevList, recipeId))
      } else {
        // error

        sendAlert({
          alert: 'Something went wrong. Please refresh and try again',
          type: 'warning',
        })
      }
    } else {
      // not signed in
      sendAlert({alert: 'Please sign in to favorite a recipe', type: 'warning'})
    }
  }
  // copy to clipboard and send UI alert
  const handleShare = (recipeId) => {
    sendAlert({alert: 'Link copied to clipboard', type: 'success'})
    let baseRecipeRoute = routes.RECIPE.split(':')[0]
    baseRecipeRoute = baseRecipeRoute.slice(1)
    navigator.clipboard.writeText(
      window.location.href + baseRecipeRoute + recipeId,
    )
  }
  // set UI alert
  const sendAlert = (alertObject) => {
    setIsAlert(true)
    setAlertMessage(alertObject.alert)
    setAlertType(alertObject.type)
  }
  // close UI alert
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return // without closing
    }

    setIsAlert(false)
    setAlertMessage('')
  }

  return (
    <Grid container className={classes.root}>
      {isLoaded && (
        <Grid container className={classes.headerContainer}>
          <HeaderRecipes
            className={classes.header}
            classes={classes}
            isLoaded={isLoaded}
            headerRecipes={headerRecipes}
            handleClick={handleClick}
            sortBy={sortBy}
            routes={routes}
          />
        </Grid>
      )}
      <Grid container className={classes.cardRoot}>
        <AlertBar
          on={isAlert}
          message={alertMessage}
          type={alertType}
          handleClose={handleClose}
        />
        {isLoaded ? (
          data.map((recipe) => (
            <Grid
              key={recipe.id}
              item
              xs={8}
              sm={12}
              md={6}
              lg={4}
              xl={3}
            >
              <OneCard
                userId={user ? user.id : null}
                classes={classes}
                recipe={recipe}
                isFavorited={favoriteList.includes(recipe.id)}
                handleFavorite={handleFavorite}
                handleShare={handleShare}
                routes={routes}
              />
            </Grid>
          ))
        ) : (
          <></>
        )}
      </Grid>
    </Grid>
  )
}

export default RecipeCards
