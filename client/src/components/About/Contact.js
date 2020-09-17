import React from 'react'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const Contact = (props) => {
  const {
    classes,
    isActive,
    handleTextClick,
    feedback,
    isLoading,
    handleChange,
    handleSubmit,
  } = props

  return (
    <Grid
      item
      className={
        isActive ? classes.activeTabContentGridItem : classes.tabContentGridItem
      }
      onClick={() => handleTextClick('Contact')}
    >
      <div className={classes.contactRoot}>
        <Typography variant="h3" className={classes.tabHeader}>
          Contact
        </Typography>
        {isActive && (
          <div className={classes.contactInner}>
            <Grid container className={classes.contactHeader}>
              <Typography variant="h4">Anders Ward</Typography>
            </Grid>
            <Grid container className={classes.contactText}>
              <Grid container>
                <Typography variant="body1">
                  (650) 862-3077
                  <br />
                  anders.s.ward@gmail.com
                </Typography>
              </Grid>
              <Grid container>
                <Link
                  href="https://www.linkedin.com/in/anders-ward-35b015184/"
                  className={classes.link}
                >
                  <Typography variant="body1">LinkedIn</Typography>
                </Link>
              </Grid>
              <Grid container>
                <Link
                  href="https://github.com/award96"
                  className={classes.link}
                >
                  <Typography variant="body1">GitHub</Typography>
                </Link>
              </Grid>
            </Grid>
            <Grid container className={classes.contactHeader}>
              <Typography variant="h4">Regarding the Website</Typography>
            </Grid>
            <Grid container className={classes.contactText}>
              <Typography variant="body1">recipenook.help@gmail.com</Typography>
            </Grid>
            <Grid container className={classes.contactHeader}>
              <Typography variant="h4">For quick feedback</Typography>
            </Grid>
            <Grid container>
              <TextField
                fullWidth
                value={feedback}
                variant="outlined"
                onChange={handleChange}
                multiline
                rows={5}
              />
              <Button
                className={classes.feedbackButton}
                variant="outlined"
                type="submit"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                Submit
              </Button>
            </Grid>
          </div>
        )}
      </div>
    </Grid>
  )
}

export default Contact
