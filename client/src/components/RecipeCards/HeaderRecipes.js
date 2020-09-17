import React, {useContext} from 'react'
import {WindowSizeContext} from '../../windowSizeContext'
import {Link} from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Rating from '@material-ui/lab/Rating'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import {CardContent} from '@material-ui/core'
import Star from '@material-ui/icons/Star'

const HeaderRecipes = (props) => {
  let {classes, isLoaded, headerRecipes, handleClick, sortBy, routes} = props
  const {size} = useContext(WindowSizeContext) || [0, 0]
  let starSize = size[0] < 500 ? '0.5rem' : '1.2rem'
  // if not loaded render nothing
  let headerCards = <></>

  if (isLoaded) {
    // map headerRecipes data to Card components
    headerCards = headerRecipes.map((recipe, index) => (
      <Card className={classes.headerCard} elevation={0} key={index}>
        <Link
          to={`${routes.RECIPE.split(':')[0] + recipe.id}`}
          className={classes.headerLink}
        >
          <CardMedia
            className={classes.headerImg}
            component="img"
            image={recipe.img}
            title={recipe.title}
            onError={(e) => {
              e.target.src =
                'https://www.marinerschurch.org/wp-content/uploads/2020/02/placeholder.png'
            }}
          />
        </Link>
        <CardContent className={classes.headerRating}>
          <Rating
            precision={0.5}
            value={recipe.stars}
            readOnly
            icon={<Star style={{width: starSize, height: starSize}} />}
          />
        </CardContent>
      </Card>
    ))
  }

  return (
    <Paper className={classes.headerRoot} elevation={3}>
      <Paper className={classes.headerDropdown}>
        <Grid container className={classes.headerFloat}>
          <Grid item xs={3}>
            <Button
              onClick={handleClick}
              value="b"
              className={classes.headerButton}
              style={sortBy === 'b' ? {textDecoration: 'underline'} : {}}
            >
              <Typography variant="h6" className={classes.headerTitle}>
                Best
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              onClick={handleClick}
              value="n"
              className={classes.headerButton}
              style={sortBy === 'n' ? {textDecoration: 'underline'} : {}}
            >
              <Typography variant="h6" className={classes.headerTitle}>
                New
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              onClick={handleClick}
              value="t"
              className={classes.headerButton}
              style={sortBy === 't' ? {textDecoration: 'underline'} : {}}
            >
              <Typography variant="h6" className={classes.headerTitle}>
                Top
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Grid container className={classes.headerCardRoot}>
        {headerCards}
      </Grid>
    </Paper>
  )
}

export default HeaderRecipes
