import React from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import AddCircleIcon from '@material-ui/icons/AddCircle'

const ListForm = (props) => {
  // formType can be either "ingredients" OR "directions"
  const {list, formDispatch, classes, formType} = props

  // user clicks on black plus
  const handleClick = (e) => {
    formDispatch({
      type: 'addListItem',
      listType: formType,
    })
  }
  // boolean to conditionally render different things
  let isIngredients = formType === 'ingredients'
  // map over list of strings
  var listItems = list.map((value, index) => {
    return (
      <Grid container key={index}>
        <Grid
          item
          xs={10}
          sm={9}
          md={6}
          key={index}
          className={
            isIngredients
              ? classes.ingredientsFormGrid
              : classes.directionsFormGrid
          }
        >
          <TextField
            variant="outlined"
            fullWidth={!isIngredients}
            label={`${isIngredients ? 'Ingredient' : 'Step'}
                            ${index + 1}`}
            value={value}
            onChange={(e) => {
              formDispatch({
                type: 'listItem',
                listType: formType,
                index: index,
                payload: e.currentTarget.value,
              })
            }}
          />
        </Grid>
        <Grid item xs={6} />
      </Grid>
    )
  })

  return (
    <Grid container spacing={2}>
      {listItems}
      <Grid item xs={12} className={classes.addButtonGrid}>
        <Button
          size="small"
          onClick={handleClick}
          className={classes.addButton}
        >
          <AddCircleIcon />
        </Button>
      </Grid>
    </Grid>
  )
}

export default ListForm
