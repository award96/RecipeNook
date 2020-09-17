import React, {useState, useEffect, useContext} from 'react'
import {UserContext} from '../../userContext'
import WriteComment from './WriteComment'
import OneComment from './OneComment'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/styles/makeStyles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(22),
    paddingLeft: theme.spacing(1),
    marginBottom: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    [theme.breakpoints.up('xs')]: {
      paddingLeft: theme.spacing(3),
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(5),
    },
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(8),
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: theme.spacing(8),
  },
  writeConatiner: {
    display: 'flex',
    marginBottom: theme.spacing(4),
  },
  writeItem: {
    display: 'flex',
    justifyContent: 'flex-start',
    paddingBottom: theme.spacing(4),
  },
  ratingItem: {
    justifyContent: 'start',
  },
  ratingTypography: {
    color: theme.palette.text.disabled,
  },
  textFieldContainer: {
    marginBottom: theme.spacing(1),
  },
  commentContainer: {
    padding: 0,
    paddingRight: theme.spacing(1),
    margin: 0,
    paddingTop: theme.spacing(6),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(6),
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(2),
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
    },
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.black.main,
  },
  commentPaper: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  datePosted: {
    marginLeft: theme.spacing(4),
    opacity: 0.6,
    alignSelf: 'flex-end',
  },
  commentRating: {
    alignSelf: 'flex-end',
    marginLeft: theme.spacing(4),
  },
  commentIconDiv: {
    display: 'flex',
    paddingLeft: '0.1rem',
    [theme.breakpoints.up('xs')]: {
      paddingLeft: '2rem',
    },
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '5rem',
    },
  },
  commentIcon: {
    marginBottom: '-2rem',
  },
  commentContent: {
    paddingTop: theme.spacing(1),
  },
  commentReview: {
    lineHeight: '150%',
  },
  commentsRoot: {
    paddingLeft: theme.spacing(1),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('xs')]: {
      paddingLeft: theme.spacing(3),
    },
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(5),
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(8),
    },
  },
  divider: {
    width: '60%',
  },
}))

const Comments = (props) => {
  const {
    comments,
    sendAlert,
    submitReview,
    updateReview,
    handleDialogue,
    routes,
  } = props

  const {user} = useContext(UserContext) || ''
  // disables things while API request occurs
  const [isLoading, setIsLoading] = useState(false)
  // map comments data into map of OneComment components
  const [commentsMap, setCommentsMap] = useState()

  const classes = useStyles()
  // map comments
  useEffect(() => {
    if (comments && comments.length > 0) {
      let newCommentsMap = comments.map((com, index) => {
        return (
          <OneComment
            classes={classes}
            com={com}
            userId={user ? user.id : null}
            handleDialogue={handleDialogue}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            ratingId={com.id}
            key={index}
            routes={routes}
          />
        )
      })
      setCommentsMap(newCommentsMap)
    }
  }, [comments, user, isLoading])

  // submit a comment
  const handleSubmit = async (review, ratingValue, ratingId = null) => {
    setIsLoading(true)
    let inValid = validateReview(review, ratingValue)
    if (inValid) {
      // the comment did not meet requirements
      sendAlert({message: inValid, type: 'warning'})
      setIsLoading(false)
      return
    }

    var finished

    if (ratingId) {
      // update comment
      finished = await updateReview(review, ratingValue, ratingId)
    } else {
      // post new comment
      finished = await submitReview(review, ratingValue)
    }
    if (finished) {
      setIsLoading(false)
      return true // let WriteComment component know to call handleCancel()
      // which sets isEditing to false
    }
  }
  // check if comment/rating meets guidelines, returns string
  const validateReview = (review, ratingValue) => {
    if (!user) {
      return 'Please log in to post a review'
    }
    if (review && review.length > 1022) {
      return 'Your comment must be less than 1000 characters'
    }
    return review || ratingValue
      ? ''
      : 'Please submit a comment, a rating, or both'
  }

  return (
    <>
      <Grid container className={classes.root}>
        <Grid container className={classes.header}>
          <Grid item xs={12} sm={9} md={6}>
            <Typography variant="h3">Reviews</Typography>
          </Grid>
        </Grid>
        <Grid container className={classes.writeContainer}>
          <Grid item xs={6} sm={4} className={classes.writeItem}>
            <Typography variant="h4">Write a Review</Typography>
          </Grid>
        </Grid>
        <Grid container className={classes.writeContainer}>
          <Grid item xs={12} sm={9} md={6} className={classes.write}>
            <WriteComment
              classes={classes}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
      </Grid>
      <Divider variant="middle" className={classes.divider} />
      <Grid container className={classes.commentsRoot}>
        <Grid container className={classes.comments}>
          {commentsMap}
        </Grid>
      </Grid>
    </>
  )
}

export default Comments
