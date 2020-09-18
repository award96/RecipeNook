import React, {useState, useReducer, useContext, useEffect} from 'react'
import {UserContext} from '../userContext'
import fetchRecipeSecondary from '../API/fetchRecipeSecondary'
import updateRecipe from '../API/updateRecipe'
import {Redirect, useLocation} from 'react-router-dom'
import {
  CreateSteps,
  StepButtons,
  BasicInfoForm,
  ListForm,
  AlertBar,
} from '../components/index'
import {makeStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: '0.5rem',
    paddingRight: '0rem',
    minHeight: '40rem',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '2.5rem',
      paddingRight: '2.5rem',
    },
  },
  stepRoot: {
    width: '100%',
  },
  stepper: {
    backgroundColor: 'inherit',
  },
  activeStepContainer: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(8),
    paddingLeft: '2.5rem',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  ingredientsFormGrid: {
    marginTop: theme.spacing(2),
    paddingLeft: theme.spacing(1),
  },
  directionsFormGrid: {
    marginTop: theme.spacing(2),
    paddingLeft: theme.spacing(1),
  },
  addButton: {
    transform: 'translateX(-40%)',
  },
  addButtonGrid: {
    marginTop: theme.spacing(1),
    display: 'flex',
    justifyContent: 'flex-start',
  },
}))

const initialFormState = {
  title: '',
  tagline: '',
  img: '',
  ingredients: ['', '', '', ''],
  directions: ['', '', '', ''],
  isLoading: false,
  isAlert: false,
  alertMessage: '',
  alertType: 'success',
  recipePosted: false,
}
// form and ui logic
const formReducer = (state, action) => {
  switch (action.type) {
    // type something into a text field
    case 'field': {
      return {
        ...state,
        [action.fieldName]: action.payload,
      }
    } // type something into a list of text fields
    case 'listItem': {
      const index = action.index
      var list = state[action.listType]
      list[index] = action.payload
      return {
        ...state,
        [action.listType]: list,
      }
    } // add a text field to list of text fields
    case 'addListItem': {
      var longer_list = state[action.listType]
      longer_list.push('')
      return {
        ...state,
        [action.listType]: longer_list,
      }
    } // send the finished recipe to the server
    case 'submit': {
      return {
        ...state,
        isLoading: true,
        isAlert: false,
      }
    } // the server responded success
    case 'success': {
      return {
        ...state,
        isLoading: false,
        isAlert: true,
        alertMessage: 'Your recipe has been posted!',
        alertType: 'success',
        recipePosted: true,
      }
    } // the recipe was not finished when user hit submit
    case 'incomplete': {
      return {
        ...state,
        isLoading: false,
        isAlert: true,
        alertMessage: 'Please fill out all fields',
        alertType: 'warning',
      }
    } // the server responded error
    case 'failure': {
      return {
        ...state,
        isLoading: false,
        isAlert: true,
        alertMessage: action.message,
        alertType: 'warning',
      }
    } // close UI alert
    case 'closeAlert': {
      return {
        ...state,
        isAlert: false,
        alertMessage: '',
      }
    } // reset entire form
    case 'reset': {
      return initialFormState
    } // you are editing an existing recipe
    case 'import': {
      return action.fullState
    } // should never occur
    default: {
      return {...state}
    }
  }
}
// ensure the submitted recipe has all required fields
const checkRequired = (newRecipe) => {
  return (
    newRecipe.title &&
    newRecipe.tagline &&
    newRecipe.img &&
    newRecipe.ingredients.length > 0 &&
    newRecipe.directions.length > 0
  )
}
// post recipe to server
const postRecipe = async (
  user,
  formState,
  formDispatch,
  reloadData,
  prevRecipe = null,
) => {
  let newRecipe = {
    title: formState.title,
    tagline: formState.tagline,
    img: formState.img,
    ingredients: formState.ingredients,
    directions: formState.directions,
    userId: user.id,
  }

  let {ingredients, directions} = newRecipe
  // remove empty form fields
  let newIngredients = ingredients.filter((val) => val)
  let newDirections = directions.filter((val) => val)
  newRecipe.ingredients = newIngredients
  newRecipe.directions = newDirections
  // check that all required fields are filled
  let isComplete = checkRequired(newRecipe)
  if (!isComplete) {
    formDispatch({type: 'incomplete'})
    return
  }
  if (formState.title.length > 100) {
    formDispatch({
      type: 'failure',
      message: 'Please limit your title to 100 characters',
    })
    return
  }
  if (formState.tagline.length > 500) {
    formDispatch({
      type: 'failure',
      message: 'Please limit your tagline to 500 characters',
    })
    return
  }
  if (formState.img.length > 1000) {
    formDispatch({
      type: 'failure',
      message: 'Please limit your image URL to 1000 characters',
    })
    return
  }
  // now proceed with post request
  if (prevRecipe) {
    // update existing recipe
    let resp = await updateRecipe(prevRecipe.id, newRecipe)
    if (resp.status === 201) {
      formDispatch({type: 'success'})
      reloadData()
    } else {
      let message = 'Something went wrong, please refresh and try again'
      if (resp.message.errno === 1366) {
        message = 'There is a non-supported character in your recipe'
      }
      formDispatch({type: 'failure', message})
    }
  } else {
    // post new recipe
    try {
      let response = await fetch('/api/recipes/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecipe),
      })
      let jsonResp = await response.json()

      if (jsonResp.status === 201) {
        formDispatch({type: 'success'})
        reloadData()
      } else {
        let message = 'Something went wrong, please refresh and try again'
        if (jsonResp.message.errno === 1366) {
          message = 'There is a non-supported character in your recipe'
        }
        formDispatch({type: 'failure', message})
      }
    } catch (err) {
      console.log(err)
    }
  }
}
// name of each step as user sees it
const getSteps = () => {
  return ['Basic Information', 'Ingredients', 'Directions']
}

const CreateRecipe = (props) => {
  const {routes, reloadData} = props
  const classes = useStyles()
  const steps = getSteps()

  const location = useLocation()
  let isEditing, prevRecipe

  // if editing existing recipe
  if (location && location.state) {
    isEditing = location.state.isEditing
    prevRecipe = location.state.prevRecipe
  }

  // need user info to post recipe
  const {user} = useContext(UserContext) || ''
  const isLoggedIn = user ? true : false

  // Initialize Form State differently if
  // editing existing recipe
  useEffect(() => {
    if (isEditing) {
      const fetchData = async () => {
        let response = await fetchRecipeSecondary(prevRecipe.id)

        let newFormState = {
          ...initialFormState,
          title: prevRecipe.title,
          tagline: prevRecipe.tagline,
          img: prevRecipe.img,
          ingredients: response.ingredients.map((item) => item.ingredient),
          directions: response.directions.map((item) => item.direction),
        }
        // fill form with existing recipe data
        formDispatch({type: 'import', fullState: newFormState})
      }
      fetchData()
    }
  }, [isEditing, prevRecipe])

  const [formState, formDispatch] = useReducer(formReducer, initialFormState)

  // Step State (What step is the user on)
  const [activeStep, setActiveStep] = useState(0)

  // Go to next step (or submit recipe)
  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      formDispatch({type: 'submit'})
      postRecipe(user, formState, formDispatch, reloadData, prevRecipe)
      return
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }
  // Go to previous step
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  // Reset form
  const handleReset = () => {
    formDispatch({type: 'reset'})
    setActiveStep(0)
  }

  // close alert
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return // without closing alert
    }

    formDispatch({type: 'closeAlert'})
  }

  if (!isLoggedIn) {
    return (
      <Redirect
        to={{
          pathname: routes.CREATE_ACCOUNT,
          props: {
            wasRedirected: true,
            alertMessage: 'Please log in to create a recipe',
          },
        }}
      />
    )
  }
  return (
    <Grid className={classes.root}>
      <AlertBar
        on={formState.isAlert}
        message={formState.alertMessage}
        type={formState.alertType}
        handleClose={handleClose}
      />
      <CreateSteps classes={classes} activeStep={activeStep} steps={steps} />
      <Grid container className={classes.activeStepContainer}>
        {activeStep === 0 && (
          <BasicInfoForm
            classes={classes}
            formState={formState}
            formDispatch={formDispatch}
          />
        )}
        {activeStep === 1 && (
          <ListForm
            classes={classes}
            formDispatch={formDispatch}
            list={formState.ingredients ? formState.ingredients : ['']}
            formType="ingredients"
          />
        )}
        {activeStep === 2 && (
          <ListForm
            classes={classes}
            formDispatch={formDispatch}
            list={formState.directions}
            formType="directions"
          />
        )}
      </Grid>
      <StepButtons
        classes={classes}
        activeStep={activeStep}
        steps={steps}
        handleReset={handleReset}
        handleBack={handleBack}
        handleNext={handleNext}
        disabled={formState.isLoading}
        recipePosted={formState.recipePosted}
        isEditing={isEditing}
      />
    </Grid>
  )
}

export default CreateRecipe
