import React, {useState, useContext, useEffect} from 'react'
import {UserContext} from '../userContext'
import {WindowSizeContext} from '../windowSizeContext'
import fetchRecipeSecondary from '../API/fetchRecipeSecondary'
import redirectEditRecipe from '../components/Shared/redirectEditRecipe'
import {useHistory} from 'react-router-dom'
import deleteComment from '../API/deleteComment'
import updateComment from '../API/updateComment'
import {useParams} from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import {
  Title,
  Tagline,
  Ingredients,
  Directions,
  Comments,
  AlertBar,
  DialoguePopup,
} from '../components/index'

const Recipe = (props) => {
  const {data, isLoaded, routes} = props
  const {user} = useContext(UserContext) || ''
  const {size} = useContext(WindowSizeContext) || [0, 0]
  var history = useHistory()
  // recipe id from url
  let {recipeId} = useParams()
  recipeId = parseInt(recipeId)

  // prevents null references
  const [isRecipeLoaded, setIsRecipeLoaded] = useState(false)

  // Recipe content state
  const [thisRecipe, setThisRecipe] = useState()
  const [comments, setComments] = useState([])

  const [ingredients, setIngredients] = useState([])
  const [directions, setDirections] = useState([])

  // UI alert
  const [alertOn, setAlertOn] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState('success')

  // for dialogue popup
  const [isOpen, setIsOpen] = useState(false)
  const [dialogueComment, setDialogueComment] = useState()

  // set recipe content state
  useEffect(() => {
    // find the recipe from fetched data, or fetch recipe specific data
    if (isLoaded) {
      // prevents app from fetching same recipe twice
      const getThisRecipe = async () => {
        let getRecipe
        getRecipe = data.find((recipe) => recipe.id === recipeId)
        if (!getRecipe) {
          let thisRecipeResponse = await fetch(`/api/recipes/get/${recipeId}`)
          let thisRecipeJson = await thisRecipeResponse.json()
          getRecipe = thisRecipeJson[0]
        }
        setThisRecipe(getRecipe)
        setIsRecipeLoaded(true)
      }
      getThisRecipe()
    }

    // fetch recipe data stored in other tables regardless of isLoaded
    const fetchData = async () => {
      let response = await fetchRecipeSecondary(recipeId)
      setIngredients(response.ingredients)
      setDirections(response.directions)
      setComments(response.comments)
    }
    fetchData()
  }, [recipeId, isLoaded, data])

  // UI alert to inform user
  const sendAlert = (alertObj) => {
    setAlertOn(true)
    setAlertMessage(alertObj.message)
    setAlertType(alertObj.type)
  }

  // close UI alert
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setAlertOn(false)
    setAlertMessage('')
  }
  // user posts a comment
  const submitReview = async (comment, ratingValue) => {
    let review = {
      comment: comment,
      rating: ratingValue,
      userId: user.id,
      recipeId: recipeId,
      recipeUserId: thisRecipe.userId,
    }
    let response = await fetch('/api/reviews/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
    })
    let jsonResp = await response.json()
    if (jsonResp.status === 200) {
      const {insertId} = jsonResp
      let alertObj = {message: 'Review successfully posted', type: 'success'}
      sendAlert(alertObj)
      let commentsCopy = [...comments]
      if (ratingValue) {
        commentsCopy = commentsCopy.map((com) => {
          if (user && com.userID === user.id && com.star) {
            com.star = null
          }
          return com
        })
      }
      commentsCopy.unshift({
        id: insertId,
        username: user.username,
        userpic: user.userpic,
        posted: 'Just Now',
        star: ratingValue,
        userID: user.id,
        review: comment,
      })
      setComments(commentsCopy)

      return true
    } else {
      let message = 'Something went wrong, please refresh and try again'
      if (jsonResp.message.errno === 1366) {
        message = 'There is a non-supported character in your comment'
      }
      sendAlert({
        message,
        type: 'warning',
      })
      return true
    }
  }

  // user posts edited review/comment
  const updateReview = async (comment, ratingValue, ratingId) => {
    let resp = await updateComment(
      comment,
      ratingValue,
      ratingId,
      user.id,
      recipeId,
    )
    if (resp.status !== 200) {
      let message = 'Something went wrong, please refresh and try again'
      if (resp.message.errno === 1366) {
        message = 'There is a non-supported character in your comment'
      }
      sendAlert({
        message,
        type: 'warning',
      })
      return true
    } else {
      sendAlert({message: 'Review successfully updated', type: 'success'})
      let commentsCopy = [...comments]
      // delete the old version of the comment
      let del_old_index = commentsCopy.findIndex((com) => com.id === ratingId)
      commentsCopy.splice(del_old_index, 1)
      // only one rating per user per recipe
      // this just affects UI, server handles duplicate ratings
      if (ratingValue) {
        commentsCopy = commentsCopy.map((com) => {
          if (user && com.userID === user.id && com.star) {
            com.star = null
          }
          return com
        })
      }
      // add the new version to the top
      commentsCopy.unshift({
        id: ratingId,
        username: user.username,
        userpic: user.userpic,
        posted: 'Just Now',
        star: ratingValue,
        userID: user.id,
        review: comment,
      })
      setComments(commentsCopy)

      return true
    }
  }

  // user deletes their comment
  const deleteReview = async (ratingId) => {
    handleDialogueClose()
    let resp = await deleteComment(ratingId)
    if (!ratingId || resp.status !== 200) {
      sendAlert({
        message: 'Something went wrong, please refresh and try again',
        type: 'warning',
      })
    } else {
      sendAlert({message: 'Deleted', type: 'success'})
      let commentsCopy = [...comments]
      let del_index = commentsCopy.findIndex((com) => com.id === ratingId)
      commentsCopy.splice(del_index, 1)
      setComments(commentsCopy)
    }
  }

  // dialogue popup
  const handleDialogue = (comment) => {
    setDialogueComment(comment)
    setIsOpen(true)
  }
  const handleDialogueClose = () => {
    setIsOpen(false)
  }

  let isThisUsersRecipe = thisRecipe && user && thisRecipe.userId === user.id
  const handleRecipeEdit = () => {
    redirectEditRecipe(thisRecipe, history)
  }
  // prevents null references
  if (!isRecipeLoaded) {
    return <></>
  }

  let paddingL = size[0] > 500 ? '2.5rem' : '0.5rem'

  return (
    <Grid
      container
      style={{
        margin: 0,
        paddingLeft: paddingL,
        width: '100%',
        marginTop: '4rem',
        minHeight: '35rem',
      }}
    >
      <AlertBar
        on={alertOn}
        message={alertMessage}
        type={alertType}
        handleClose={handleClose}
      />
      <DialoguePopup
        isOpen={isOpen}
        item={dialogueComment}
        type="rating"
        handleClose={handleDialogueClose}
        handleDelete={deleteReview}
      />
      <Grid container>
        <Title
          data={thisRecipe}
          numComments={comments ? comments.length : 0}
          routes={routes}
          isThisUsersRecipe={isThisUsersRecipe}
          handleEdit={handleRecipeEdit}
        />
      </Grid>
      <Grid container>
        <Tagline data={thisRecipe} />
      </Grid>
      <Grid container>
        <Ingredients
          title={thisRecipe.title}
          img={thisRecipe.img}
          ingredients={ingredients}
        />
      </Grid>
      <Grid container>
        <Directions directions={directions} />
      </Grid>
      <Grid container>
        <Comments
          comments={comments}
          sendAlert={sendAlert}
          submitReview={submitReview}
          updateReview={updateReview}
          handleDialogue={handleDialogue}
          recipeId={recipeId}
          routes={routes}
        />
      </Grid>
    </Grid>
  )
}

export default Recipe
