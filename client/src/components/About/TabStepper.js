import React from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import PersonIcon from '@material-ui/icons/Person'
import CodeIcon from '@material-ui/icons/Code'
import PhoneIcon from '@material-ui/icons/Phone'

const TabStepper = (props) => {
  const {classes, tab, handleClick} = props

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Grid item xs={4} className={classes.linkGridItem}>
        <Button
          onClick={handleClick}
          className={tab === 'Author' ? classes.activeButton : classes.button}
          name="Author"
          disableRipple
        >
          <PersonIcon className={classes.icon} />
          Author
        </Button>
      </Grid>
      <Grid item xs={4} className={classes.linkGridItem}>
        <Button
          onClick={handleClick}
          className={tab === 'Code' ? classes.activeButton : classes.button}
          name="Code"
          disableRipple
        >
          <CodeIcon className={classes.icon} />
          Code
        </Button>
      </Grid>
      <Grid item xs={4} className={classes.linkGridItem}>
        <Button
          onClick={handleClick}
          className={tab === 'Contact' ? classes.activeButton : classes.button}
          name="Contact"
          disableRipple
        >
          <PhoneIcon className={classes.icon} />
          Contact
        </Button>
      </Grid>
    </Breadcrumbs>
  )
}

export default TabStepper
