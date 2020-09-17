import React, {useState} from 'react'
import WriteComment from './WriteComment'
import {Link} from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import Rating from '@material-ui/lab/Rating'

const OneComment = (props) => {
  let {
    classes,
    com,
    userId,
    handleDialogue,
    handleSubmit,
    isLoading,
    routes,
  } = props
  // if true the comment is a text field
  const [isEditing, setIsEditing] = useState(false)
  // stop editing a comment
  const handleCancel = () => {
    setIsEditing(false)
  }
  // render text field style component
  if (isEditing) {
    return (
      <Grid className={classes.commentContainer} item xs={12} sm={9} md={6}>
        <WriteComment
          classes={classes}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          initialReview={com.review}
          initialRating={com.star}
          isEditing={isEditing}
          handleCancel={handleCancel}
          ratingId={com.id}
        />
      </Grid>
    )
  }
  // render comment
  return (
    <Grid container className={classes.commentContainer}>
      <Grid item xs={12} sm={12} md={12} className={classes.commentHeader}>
        <Grid container>
          <Link
            to={routes.USER_PROFILE.split(':')[0] + com.username}
            className={classes.link}
          >
            <Avatar
              aria-label="commentAvatar"
              size="small"
              className={classes.avatar}
              alt={com.username}
              src={com.userpic}
            />
            <Typography variant="body1">{com.username}</Typography>
          </Link>
          <Typography variant="body1" className={classes.datePosted}>
            {com.posted}
          </Typography>
          {com.star ? (
            <Rating
              readOnly
              value={com.star}
              className={classes.commentRating}
            />
          ) : (
            <></>
          )}
          {userId === com.userID ? (
            <div className={classes.commentIconDiv}>
              <IconButton
                onClick={() => handleDialogue(com)}
                className={classes.commentIcon}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                onClick={() => setIsEditing(true)}
                className={classes.commentIcon}
              >
                <EditIcon />
              </IconButton>
            </div>
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
      <Grid item xs={12} sm={9} md={6} className={classes.commentContent}>
        {com.review && (
          <Paper className={classes.commentPaper} elevation={3}>
            <Typography variant="body2" className={classes.commentReview}>
              {com.review}
            </Typography>
          </Paper>
        )}
      </Grid>
    </Grid>
  )
}

export default OneComment
