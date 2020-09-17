import React from 'react'
import {Link} from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircle'

const ButtonCreateRecipe = (props) => {
  const {classes, isMobile, routes} = props

  return (
    <Grid
      container
      className={classes.createRecipeContainer}
      justify={isMobile ? 'center' : 'flex-start'}
    >
      <Grid
        item
        xs={false}
        sm={11}
        md={10}
        className={classes.createRecipeGridText}
      >
        {!isMobile && (
          <Typography variant="body2" className={classes.createRecipeText}>
            <Link
              to={routes.CREATE_RECIPE}
              style={{color: 'inherit', textDecoration: 'none'}}
            >
              Create <br />
              recipe
            </Link>
          </Typography>
        )}
      </Grid>
      <Grid item xs={1} className={classes.createRecipeGridButton}>
        <Link to={routes.CREATE_RECIPE} style={{textDecoration: 'none'}}>
          <IconButton className={classes.createRecipe} size="small">
            <AddCircleOutlinedIcon className={classes.addCircle} />
          </IconButton>
        </Link>
      </Grid>
    </Grid>
  )
}
export default ButtonCreateRecipe
