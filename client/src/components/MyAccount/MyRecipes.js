import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import deleteRecipe from '../../API/deleteRecipe'
import redirectEditRecipe from '../Shared/redirectEditRecipe'
import {OneCard, DialoguePopup} from '../index'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    justifySelf: 'end',
    width: '100%',
    paddingTop: '7rem',
    justfiyContent: 'end',
    paddingLeft: '3rem',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '1rem',
    },
  },
  header: {
    justifyContent: 'center',
    paddingBottom: '5rem',
  },
}))

const MyRecipes = (props) => {
  const classes = useStyles()
  const {user, data, isLoaded, sendAlert, routes, reloadData} = props
  // used to push redirect to edit recip
  var history = useHistory()
  // recipe data state
  const [myRecipes, setMyRecipes] = useState()
  // dialogue popup state
  const [isOpen, setIsOpen] = useState(false)
  const [dialogueRecipe, setDialogueRecipe] = useState()
  // set recipes from app data
  useEffect(() => {
    setMyRecipes(data.filter((recipe) => recipe.userId === user.id))
  }, [user, data])
  // open dialogue and tell it which recipe was clicked on
  const handleDialogue = (recipe) => {
    setDialogueRecipe(recipe)
    setIsOpen(true)
  }
  // close dialogue
  const handleClose = () => {
    setIsOpen(false)
  }
  // delete recipe because of dialogue popup click
  const handleDelete = async (recipeId) => {
    handleClose()
    let resp = await deleteRecipe(recipeId)
    if (!resp.ok) {
      // unsuccessful
      sendAlert({
        alert: 'Something went wrong. Please refresh and try again',
        type: 'warning',
      })
      return
    } else {
      // success
      sendAlert({alert: 'Deleted', type: 'success'})
      // edit local recipe data state
      setMyRecipes((prevMyRecipes) => {
        let del_index = prevMyRecipes.findIndex(
          (recipe) => recipe.id === recipeId,
        )
        prevMyRecipes.splice(del_index, 1)
        return [...prevMyRecipes]
      })
    }
    reloadData()
  }
  // redirect to create recipe with isEditing state
  const handleEdit = (prevRecipe) => {
    redirectEditRecipe(prevRecipe, history)
  }

  return (
    <Grid container className={classes.root} spacing={3}>
      <DialoguePopup
        isOpen={isOpen}
        item={dialogueRecipe}
        type="recipe"
        handleClose={handleClose}
        handleDelete={handleDelete}
      />

      <Grid container className={classes.header} justify="center">
        <Grid item xs={5}>
          <Typography variant="h4">My Recipes</Typography>
        </Grid>
      </Grid>
      {isLoaded && myRecipes ? (
        myRecipes.map((recipe) => (
          <Grid item key={recipe.id}>
            <OneCard
              recipe={recipe}
              small
              isOwner
              handleDelete={handleDialogue}
              handleEdit={handleEdit}
              routes={routes}
            />
          </Grid>
        ))
      ) : (
        <></>
      )}
    </Grid>
  )
}

export default MyRecipes
