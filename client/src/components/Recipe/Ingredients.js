import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/styles/makeStyles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import CardMedia from '@material-ui/core/CardMedia'

const rowHeight = 600

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: '8.5%',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '17%',
    },
  },
  listLong: {
    width: '100%',
    maxWidth: 360,
    height: rowHeight,
    [theme.breakpoints.up('sm')]: {
      marginBottom: 0,
    },
  },
  media: {
    padding: 0,
    margin: 0,
    height: 0,
    paddingBottom: rowHeight,
    [theme.breakpoints.up('md')]: {
      paddingBottom: 0,
    },
  },
  img: {
    paddingLeft: '-17%',
    maxWidth: '83vw',
    maxHeight: rowHeight,
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '0%',
      maxWidth: '50vw',
    },
  },
}))

const Ingredients = (props) => {
  const {title, img, ingredients} = props
  const classes = useStyles()
  // checkboxes next to ingredient
  const [checked, setChecked] = React.useState([])
  // toggle list of bool (checkboxes)
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }
  // map ingredients data to list components
  const getIngreds = ingredients.map((ingred, index) => {
    const labelId = `checkbox-list-label-${index}`

    return (
      <ListItem
        key={index}
        role={undefined}
        dense
        button
        onClick={handleToggle(index)}
      >
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={checked.indexOf(index) !== -1}
            tabIndex={-1}
            disableRipple
            inputProps={{'aria-labelledby': labelId}}
          />
        </ListItemIcon>
        <ListItemText id={labelId} primary={ingred.ingredient} />
      </ListItem>
    )
  })

  return (
    <Grid container spacing={0} className={classes.root}>
      <Grid item xs={12}>
        <Typography variant="h3">Ingredients</Typography>
      </Grid>
      <Grid className={classes.listLong} item sm={12} md={5} xl={4}>
        <List>{getIngreds}</List>
      </Grid>
      <Grid item sm={12} md={5} xl={4}>
        <CardMedia className={classes.media} title={title}>
          <img src={img} alt={title} className={classes.img} />
        </CardMedia>
      </Grid>
    </Grid>
  )
}

export default Ingredients
