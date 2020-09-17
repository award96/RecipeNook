import React from 'react'
import {Link} from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import Avatar from '@material-ui/core/Avatar'
import Rating from '@material-ui/lab/Rating'
import makeStyles from '@material-ui/styles/makeStyles'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: '17%',
  },
  title: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  avatarGrid: {
    positon: 'relative',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  avatar: {
    position: 'relative',
  },
  subtitleRating: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginTop: '1%',
    position: 'relative',
  },
  metricsTypography: {
    paddingLeft: '4%',
    variant: 'overline',
    align: 'center',
  },
  editButton: {
    paddingLeft: '1rem',
  },
}))

const Title = (props) => {
  const {data, numComments, routes, isThisUsersRecipe, handleEdit} = props
  const classes = useStyles()

  return (
    <Grid container spacing={0} className={classes.root}>
      <Grid item xs={12} className={classes.title}>
        <Typography variant="h2">{data.title}</Typography>
        {isThisUsersRecipe && (
          <IconButton className={classes.editButton} onClick={handleEdit}>
            <EditIcon />
          </IconButton>
        )}
      </Grid>
      <Grid container item className={classes.subtitle} xs={12}>
        <Grid item xs={9} sm={3} md={1}>
          <Grid container item xs={12} className={classes.avatarGrid}>
            <Link
              to={routes.USER_PROFILE.split(':')[0] + data.username}
              style={{textDecoration: 'none'}}
            >
              <Avatar
                className={classes.avatar}
                alt={data.username}
                src={data.userpic}
              />
            </Link>
          </Grid>
          <Grid container item xs={12} className={classes.avatarGrid}>
            <Link
              to={routes.USER_PROFILE.split(':')[0] + data.username}
              style={{textDecoration: 'none', color: 'inherit'}}
            >
              <Typography variant="subtitle1">{data.username}</Typography>
            </Link>
          </Grid>
        </Grid>
        <Grid item xs={8} className={classes.subtitleRating}>
          <Grid container spacing={2}>
            <Rating value={data.stars || null} precision={0.5} readOnly />
            <Typography className={classes.metricsTypography}>
              {data.countStars || 0}{' '}
              {data.countStars === 1 ? 'review' : 'reviews'} , {numComments}{' '}
              comments
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Title
