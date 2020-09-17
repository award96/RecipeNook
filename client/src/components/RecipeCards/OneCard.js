import React from 'react'
import {Link} from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Rating from '@material-ui/lab/Rating'
import Typography from '@material-ui/core/Typography'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import {makeStyles} from '@material-ui/core/styles'

const OneCard = (props) => {
  const {
    recipe,
    small,
    isFavorited,
    isOwner,
    handleFavorite,
    handleShare,
    handleDelete,
    handleEdit,
    routes,
  } = props
  // styles change depending on "small" prop
  const useStyles = makeStyles((theme) => ({
    OneCardRoot: {
      boxShadow: 4,
      width: (small && 250) || 345,
      maxWidth: (small && 250) || 345,
      marginBottom: 75,
      marginTop: '-2rem',
    },
    paper: {
      backgroundColor: 'inherit',
      elevation: 3,
    },
    card: {
      backgroundColor: 'inherit',
      boxShadow: 4,
      elevation: 10,
      height: (small && 300) || '31rem',
    },
    cardHeader: {
      height: '3.4rem',
      maxHeight: '3.4rem',
      overflow: 'auto',
    },
    userProfileLink: {
      textDecoration: 'none',
    },
    cardMedia: {
      height: '13.5rem',
      maxWidth: '95%',
      margin: '0 auto',
    },
    content: {
      position: 'relative',
      zIndex: 0,
      marginBottom: 0,
      height: '6rem',
      maxHeight: '6rem',
    },
    tagline: {
      overflow: 'auto',
      height: '6rem',
      maxHeight: '6rem',
    },
    cardActions: {
      position: 'relative',
      zIndex: 1,
      backgroundColor: 'inherit',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
    },
    link: {
      textDecoration: 'none',
      marginBottom: 0,
      color: theme.palette.black.main,
    },
    cardActionArea: {
      marginBottom: 0,
    },
    filledFavorite: {
      color: theme.palette.primary.main,
    },
  }))

  const classes = useStyles()
  // user avatar pic
  const AvatarRender = () => (
    <Link
      className={classes.userProfileLink}
      to={`${routes.USER_PROFILE.split(':')[0] + recipe.username}`}
    >
      <Avatar
        aria-label="recipe"
        className={classes.avatar}
        alt={recipe.username}
        src={recipe.userpic}
      />
    </Link>
  )
  // recipe img
  const RecipeImgRender = () => (
    <CardMedia
      className={classes.cardMedia}
      component="img"
      image={recipe.img}
      title={recipe.title}
      onError={(e) => {
        e.target.src =
          'https://www.marinerschurch.org/wp-content/uploads/2020/02/placeholder.png'
      }}
    />
  )
  // favorite, share, and rating
  // ("isFavorited" determines color of favoriteIcon)
  const StandardCardActions = () => (
    <>
      <IconButton
        aria-label="add to favorites"
        onClick={() => handleFavorite(recipe.id, recipe.userId)}
      >
        <FavoriteIcon
          className={isFavorited ? classes.filledFavorite : classes.favorite}
        />
      </IconButton>
      <IconButton aria-label="share" onClick={() => handleShare(recipe.id)}>
        <ShareIcon />
      </IconButton>
      <IconButton disabled>
        <Rating precision={0.5} value={recipe.stars} readOnly />
      </IconButton>
    </>
  )
  // edit and delete
  const OwnerCardActions = () => (
    <>
      <IconButton
        aria-label="delete recipe"
        onClick={() => handleDelete(recipe)}
      >
        <DeleteIcon />
      </IconButton>
      <IconButton aria-label="edit recipe" onClick={() => handleEdit(recipe)}>
        <EditIcon />
      </IconButton>
    </>
  )
  // optionally render different looking OneCards based on
  // "small" and "isOwner"
  return (
    <Grid item sm={12} md={4} className={classes.OneCardRoot}>
      <Paper className={classes.paper}>
        <Card className={classes.card}>
          <CardHeader
            className={classes.cardHeader}
            avatar={!small && <AvatarRender />}
            title={
              <Link
                to={routes.RECIPE.split(':')[0] + recipe.id}
                className={classes.link}
              >
                <Typography variant="body1">{recipe.title}</Typography>
              </Link>
            }
          />
          <Link
            to={routes.RECIPE.split(':')[0] + recipe.id}
            className={classes.link}
          >
            <CardActionArea className={classes.cardActionArea} disableRipple>
              {!small && <RecipeImgRender />}

              <CardContent className={classes.content}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  className={classes.tagline}
                >
                  {recipe.tagline}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Link>
          <CardActions disableSpacing className={classes.cardActions}>
            {isOwner ? <OwnerCardActions /> : <StandardCardActions />}
          </CardActions>
        </Card>
      </Paper>
    </Grid>
  )
}

export default OneCard
