import React, {useState} from 'react'
import postFeedback from '../API/postFeedback'
import {TabStepper, Author, Code, Contact, AlertBar} from '../components/index'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: '5vw',
    marginRight: 0,
    marginTop: theme.spacing(8),
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '2.5rem',
    },
  },
  tabRoot: {
    paddingLeft: '0rem',
    display: 'flex',
    justifyContent: 'flex-start',
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '2.5rem',
    },
  },
  titleGridItem: {
    display: 'flex',
    justifyContent: 'center',
  },
  linkGridItem: {},

  button: {
    color: theme.palette.black.light,
  },
  activeButton: {
    color: theme.palette.black.main,
  },
  gridSize: {},
  tabContentGridItem: {
    cursor: 'pointer',

    maxWidth: '25vw',
    opacity: 0.2,
    '&:hover': {
      opacity: 0.5,
    },
    [theme.breakpoints.up('sm')]: {
      height: '35rem',
      marginBottom: theme.spacing(8),
    },
  },
  activeTabContentGridItem: {
    marginBottom: theme.spacing(8),
    width: '80vw',
    minWidth: '0rem',
    overflowX: 'auto',
    [theme.breakpoints.up('sm')]: {
      width: '50vw',
      minWidth: '25rem',
    },
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(50),
    },
  },
  tabHeader: {
    marginBottom: theme.spacing(4),
  },
  authorRoot: {
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(2),
    },
  },
  authorIntro: {
    // minWidth: '22rem',
    marginBottom: theme.spacing(4),
    display: 'inline-flex',
    [theme.breakpoints.up('sm')]: {
      minWidth: '22rem',
    },
  },
  authorpicItem: {
    marginRight: '0rem',
    order: 0,
    maxWidth: 200,
    [theme.breakpoints.up('sm')]: {
      marginRight: '2rem',
    },
  },
  authorpic: {
    width: 200,
    height: 200,
    marginBottom: 0,
    paddignBottom: 0,
  },
  authorbioItem: {
    order: 1,
  },
  authorbio: {
    display: 'inline',
  },
  resumeContainer: {
    display: 'flex',
    marginTop: theme.spacing(6),
    paddingLeft: '0.1rem',
    marginBottom: '0.1rem',
  },
  link: {
    color: theme.palette.linkText.about,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  codeRoot: {
    paddingLeft: 0,
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(3),
    },
  },
  codeHeader: {
    justifyContent: 'center',
    marginBottom: theme.spacing(6),
  },
  codeContainer: {
    marginBottom: '15vh',
    [theme.breakpoints.up('sm')]: {
      paddingRight: '2rem',
    },
  },
  accordionTitleContainer: {
    justifyContent: 'flex-start',
    [theme.breakpoints.up('md')]: {
      justifyContent: 'center',
    },
  },
  reactImg: {
    width: 200,
    height: 100,
  },
  materialImg: {
    width: 200,
    height: 200,
  },
  nodeImg: {
    width: 200,
    height: 122,
  },
  expressImg: {
    width: 200,
    height: 88,
  },
  mysqlImg: {
    width: 200,
    height: 103,
  },
  herokuImg: {
    width: 200,
    height: 105,
  },
  contactRoot: {
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
  },
  contactInner: {
    paddingLeft: theme.spacing(3),
  },
  contactHeader: {
    marginBottom: theme.spacing(3),
  },
  contactText: {
    marginBottom: theme.spacing(6),
  },
  feedbackButton: {
    marginTop: theme.spacing(1),
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  invisButton: {
    margin: 0,
    padding: 0,
    border: 0,
    width: 'inherit',
    height: 'inherit',
  },
}))

const About = (props) => {
  const classes = useStyles()
  // which tab is displayed
  const [tab, setTab] = useState('Code')
  // feedback form in contact tab
  const [feedback, setFeedback] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  // UI alert state
  const [isAlert, setIsAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState('success')
  // click on a new active tab
  const handleClick = (e) => {
    setTab(e.currentTarget.name)
  }
  // click directly on content to set new active tab
  const handleTextClick = (newTab) => {
    setTab(newTab)
  }
  // contact tab feedback form
  const handleChange = (e) => {
    setFeedback(e.currentTarget.value)
  }
  // contact tab feedback submit
  const handleSubmit = async () => {
    setIsLoading(true)
    let respJson = await postFeedback(feedback)
    if (respJson.ok) {
      setFeedback('')
      setIsAlert(true)
      setAlertMessage('Thank you for your feedback')
      setAlertType('success')
    } else {
      setIsAlert(true)
      setAlertMessage('Error please refresh and try again')
      setAlertType('warning')
    }
    setIsLoading(false)
  }
  // close alert
  const handleClose = () => {
    setIsAlert(false)
  }

  return (
    <div className={classes.root}>
      <AlertBar
        on={isAlert}
        message={alertMessage}
        type={alertType}
        handleClose={handleClose}
      />
      <Grid container>
        <Grid item xs={6} sm={4} className={classes.titleGridItem}>
          <Typography variant="h2">About</Typography>
        </Grid>
      </Grid>
      <Grid
        container
        item
        spacing={2}
        className={classes.tabRoot}
        xs={12}
        sm={11}
      >
        <TabStepper classes={classes} tab={tab} handleClick={handleClick} />
      </Grid>
      <Grid container>
        <Grid item xs={true} className={classes.gridSize}>
          <Author
            classes={classes}
            isActive={tab === 'Author'}
            handleTextClick={handleTextClick}
          />
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item xs={true} className={classes.gridSize}>
          <Code
            classes={classes}
            isActive={tab === 'Code'}
            handleTextClick={handleTextClick}
          />
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item xs={true} className={classes.gridSize}>
          <Contact
            classes={classes}
            isActive={tab === 'Contact'}
            handleTextClick={handleTextClick}
            feedback={feedback}
            isLoading={isLoading}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default About
