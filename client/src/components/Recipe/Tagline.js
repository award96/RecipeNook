import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    display: 'flex',
    justifyContent: 'flex-start',
    [theme.breakpoints.up('xs')]: {
      margin: theme.spacing(8),
      marginLeft: '17%',
    },
  },
  grid: {
    display: 'flex',
    justifyContent: 'center',
  },
}))

const Tagline = ({data}) => {
  const classes = useStyles()
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={8}>
        <Typography variant="h5" className={classes.typography}>
          {data.tagline}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Tagline
