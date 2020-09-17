import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import MuiAlert from '@material-ui/lab/Alert'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(12),
    minHeight: '35rem',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  alert: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(4),
  },
  submit: {
    color: theme.palette.white.main,
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.palette.black.light,
  },
  routerLink: {
    cursor: 'pointer',
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}))

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

export {useStyles, Alert}
