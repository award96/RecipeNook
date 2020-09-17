import React from 'react'
import PersonIcon from '@material-ui/icons/Person'
import CheckIcon from '@material-ui/icons/Check'
import {makeStyles} from '@material-ui/core/styles'

const checkSize = '0.7rem'
const useStyles = makeStyles((theme) => ({
  root: {
    transform: 'translateX(-0.2rem)',
  },
  check: {
    width: checkSize,
    height: checkSize,
    transform: 'translateX(0.4rem) translateY(-0.4rem)',
  },
}))

const PersonCheckmarkIcon = () => {
  const classes = useStyles()
  // custom MUIcon that represents a followed user
  // parent element a button which would unfollow that user
  return (
    <div className={classes.root}>
      <CheckIcon className={classes.check} color="disabled" />
      <PersonIcon className={classes.person} color="disabled" />
    </div>
  )
}

export default PersonCheckmarkIcon
