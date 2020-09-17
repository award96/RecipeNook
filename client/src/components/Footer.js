import React from 'react'
import {Link as RouterLink} from 'react-router-dom'
import Copyright from './Shared/Copyright'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/styles/makeStyles'

const useStyles = makeStyles((theme) => {
  return {
    root: {
      marginTop: '15%',
      backgroundColor: theme.palette.black.light,
    },
    spacer: {
      height: 75,
    },
    botLinksContainer: {
      marginLeft: '2.5rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    botLinks: {
      position: 'relative',
      color: theme.palette.linkText.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    copyrightGrid: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  }
})

const Footer = ({routes}) => {
  const classes = useStyles()
  const colWidthLinks = 1
  return (
    <div className={classes.root}>
      <Divider variant="fullWidth" />
      <Grid container className={classes.spacer}>
        <Grid
          item
          xs={2}
          sm={colWidthLinks}
          className={classes.botLinksContainer}
        >
          <RouterLink to={routes.RECIPE_CARDS} className={classes.botLinks}>
            <Typography>Home</Typography>
          </RouterLink>
        </Grid>
        <Grid
          item
          xs={2}
          sm={colWidthLinks}
          className={classes.botLinksContainer}
        >
          <RouterLink to={routes.ABOUT} className={classes.botLinks}>
            <Typography>About/Contact</Typography>
          </RouterLink>
        </Grid>
        <Grid
          item
          xs={2}
          sm={colWidthLinks}
          className={classes.botLinksContainer}
        >
          <Link href="https://github.com/award96" className={classes.botLinks}>
            <Typography>GitHub</Typography>
          </Link>
        </Grid>
        <Grid
          item
          xs={12}
          sm={10 - 3 * colWidthLinks}
          className={classes.copyrightGrid}
        >
          <Copyright />
        </Grid>
      </Grid>
    </div>
  )
}

export default Footer
