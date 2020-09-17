import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import {makeStyles} from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  buttonDelete: {
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
}))

const DialoguePopup = (props) => {
  const classes = useStyles()
  // parent state & function props determines popup
  const {isOpen, item, type, handleClose, handleDelete} = props

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {`Are you sure you want to delete this ${type}?`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          "{item ? item.title || item.review || '' : ''}"
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Cancel
        </Button>
        <Button
          className={classes.buttonDelete}
          variant="contained"
          onClick={() => handleDelete(item.id)}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialoguePopup
