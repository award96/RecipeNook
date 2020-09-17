import React, {useState, useEffect} from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Rating from '@material-ui/lab/Rating'

const WriteComment = (props) => {
  const {
    classes,
    handleSubmit,
    isLoading,
    initialReview,
    initialRating,
    ratingId,
    isEditing,
    handleCancel,
  } = props
  // text in text field
  const [review, setReview] = useState(initialReview)
  // value for rating component
  const [ratingValue, setRatingValue] = useState(initialRating || 5)
  // render blank text field if conditions met
  useEffect(() => {
    if (!isLoading && !isEditing) {
      setReview(null)
      setRatingValue(null)
    }
  }, [isLoading, isEditing])
  // user types in text field
  const handleChange = (e) => {
    setReview(e.currentTarget.value)
  }
  // user submits comment, either an edit or a new comment
  const handleClick = async () => {
    if (isEditing) {
      // edit to existing comment
      let finished = await handleSubmit(review, ratingValue, ratingId)
      if (finished) {
        // leave edit mode
        handleCancel()
      }
    } else {
      // new comment
      handleSubmit(review, ratingValue)
    }
  }

  return (
    <>
      <Grid container className={classes.textFieldContainer}>
        <TextField
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          name="review"
          label={`${isEditing ? 'Edit' : 'Write'} your review here (optional)`}
          type="review"
          id="review"
          autoComplete="review"
          value={review || ''}
          onChange={handleChange}
        />
      </Grid>
      <Grid container>
        <Grid item xs={6} sm={3}>
          <Button
            type="submit"
            variant="contained"
            size="small"
            color="primary"
            className={classes.submit}
            disabled={isLoading}
            onClick={handleClick}
          >
            Submit {isEditing ? 'Edit' : 'Review'}
          </Button>
        </Grid>
        {isEditing && (
          <Grid item xs={6} sm={3}>
            <Button size="small" variant="contained" onClick={handleCancel}>
              Cancel
            </Button>
          </Grid>
        )}

        <Grid item xs={6} sm={4} className={classes.ratingItem}>
          <Grid container>
            <Rating
              name={
                isEditing
                  ? `simple-controlled-${ratingId}`
                  : 'simple-controlled'
              }
              value={ratingValue}
              onChange={(event, newRating) => {
                setRatingValue(newRating)
              }}
            />
          </Grid>

          <Grid container>
            <Typography
              variant="subtitle2"
              className={classes.ratingTypography}
            >
              (Optional)
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default WriteComment
