import React from 'react'
import {Typography} from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import makeStyles from '@material-ui/styles/makeStyles'

const useStyles = makeStyles((theme) => ({
  listRoot: {
    //width: '100%',
    '&.Mui-selected': {
      textDecoration: 'line-through',
      opacity: 0.4,
      backgroundColor: 'inherit',
      '&:hover, &:focus': {
        // backgroundColor: theme.palette.background.paper,
      },
    },
  },
  box: {
    marginTop: '5rem',
    paddingLeft: '8.5%',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '17%',
    },
  },
}))

const Directions = (props) => {
  const {directions} = props
  const classes = useStyles()
  // checkbox next to each direction
  const [checked, setChecked] = React.useState([])
  // toggle array of booleans (checkboxes)
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      // check new box
      newChecked.push(value)
    } else {
      // uncheck box
      newChecked.splice(currentIndex, 1)
    }
    setChecked(newChecked)
  }
  // map directions data to list components
  const directionsList = directions.map((item, index) => {
    // render checkbox
    const labelId = `checkbox-list-label-${index}`
    if (checked.indexOf(index) !== -1) {
      // box is checked
      var checkIcon = (
        <CheckCircleIcon
          edge="start"
          checked={checked.indexOf(index) !== -1}
          tabIndex={-1}
        />
      )
    } else {
      // box is not checked
      checkIcon = (
        <CheckCircleOutlineIcon
          edge="start"
          checked={checked.indexOf(index) !== -1}
          tabIndex={-1}
        />
      )
    }
    const itemText = item.direction
    const lastItem = directions.length - 1
    // render list component
    return (
      <ListItem
        className={classes.listRoot}
        key={index}
        role={undefined}
        divider={index !== lastItem}
        alignItems="center"
        selected={checked.indexOf(index) !== -1}
        button
        onClick={handleToggle(index)}
      >
        <ListItemIcon>{checkIcon}</ListItemIcon>
        <ListItemText id={labelId} primary={itemText} />
      </ListItem>
    )
  })

  return (
    <Box className={classes.box}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h3">Directions</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <List className={classes.listRoot}>{directionsList}</List>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Directions
