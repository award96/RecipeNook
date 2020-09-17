import React from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'

const BasicInfoForm = (props) => {
  const {classes, formState, formDispatch} = props
  const {title, tagline, img} = formState

  return (
    <Grid container spacing={2} className={classes.formRoot}>
      <Grid item xs={9} sm={6} md={2}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Recipe Title"
          autoFocus
          value={title}
          onChange={(e) =>
            formDispatch({
              type: 'field',
              fieldName: 'title',
              payload: e.currentTarget.value,
            })
          }
        />
      </Grid>
      <Grid item xs={9} sm={6} md={2}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Recipe Image URL"
          value={img}
          onChange={(e) =>
            formDispatch({
              type: 'field',
              fieldName: 'img',
              payload: e.currentTarget.value,
            })
          }
        />
      </Grid>
      <Grid item xs={8} className="empty grid"></Grid>
      <Grid item xs={11} sm={9} md={4}>
        <TextField
          multiline
          rows={5}
          fullWidth
          variant="outlined"
          required
          label="Tagline"
          value={tagline}
          onChange={(e) =>
            formDispatch({
              type: 'field',
              fieldName: 'tagline',
              payload: e.currentTarget.value,
            })
          }
        />
      </Grid>
    </Grid>
  )
}

export default BasicInfoForm
