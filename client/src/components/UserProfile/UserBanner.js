import React, {useContext} from 'react'
import {WindowSizeContext} from '../../windowSizeContext'
import {makeStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import backgroundImage from '../../images/bannerBackground.jpg'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: '75% 75%',
    backgroundRepeat: 'no-repeat',
  },
  innerContainer: {
    paddingLeft: theme.spacing(2),
    alignItems: 'center',
  },
  userpicGrid: {},
  userGrid: {
    [theme.breakpoints.up('lg')]: {
      transform: 'translateX(-10%)',
    },
  },
  username: {
    color: theme.palette.white.main,
  },
  avatar: {
    height: '5rem',
    width: '5rem',
  },

  usernameGrid: {
    justifyContent: 'flex-end',
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'center',
    },
    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-start',
    },
  },
  followGrid: {
    justifyContent: 'flex-end',
    alignContent: 'flex-start',
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'center',
    },
    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-start',
    },
  },
  followButton: {
    justifySelf: 'flex-start',
    alignSelf: 'flex-start',
    transform: 'translateY(-25%)',
    color: theme.palette.white.main,
  },
  followedButton: {
    justifySelf: 'flex-start',
    alignSelf: 'flex-start',
    transform: 'translateY(-25%)',
    color: theme.palette.white.dark,
  },
  statsGrid: {
    justifyContent: 'center',
    justifySelf: 'end',
  },
  statsContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingRight: '1rem',
    [theme.breakpoints.up('lg')]: {
      paddingRight: '5rem',
    },
  },
  statsItem: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  statsTypography: {
    color: theme.palette.white.main,
  },
}))

const UserBanner = (props) => {
  const classes = useStyles()
  const {size} = useContext(WindowSizeContext)
  const {
    username,
    userpic,
    isAdded,
    handleClick,
    totalRecipes,
    totalFollowers,
    isSocialLoaded,
  } = props
  let isBreakpoint = size && size[0] < 960
  return (
    <Paper elevation={8} className={classes.root}>
      <Grid container className={classes.innerContainer}>
        <Grid item xs={1} className={classes.userpicGrid}>
          <Avatar
            aria-label="avatar"
            className={classes.avatar}
            alt={username}
            src={userpic}
          />
        </Grid>
        <Grid item sm={10} md={8} lg={2} className={classes.userGrid}>
          <Grid container className={classes.userContainer}>
            <Grid item container xs={12} className={classes.usernameGrid}>
              <Typography variant="h3" className={classes.username}>
                {username}
              </Typography>
            </Grid>
            <Grid item container xs={12} className={classes.followGrid}>
              <Button
                className={
                  isAdded ? classes.followedButton : classes.followButton
                }
                onClick={handleClick}
                disabled={!isSocialLoaded}
              >
                {isAdded ? '✓Following' : '+Follow'}
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item className="emptyGrid" md={false} lg={6}></Grid>
        {!isBreakpoint && (
          <Grid item md={3} className={classes.statsGrid}>
            <Grid container className={classes.statsContainer}>
              <Grid item xs={12} className={classes.statsItem}>
                <Typography variant="h6" className={classes.statsTypography}>
                  {totalRecipes} Recipes written
                </Typography>
              </Grid>
              <Grid item xs={12} className={classes.statsItem}>
                <Typography variant="h6" className={classes.statsTypography}>
                  {totalFollowers} Followers
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Paper>
  )
}

export default UserBanner
