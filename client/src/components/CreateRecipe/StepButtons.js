import React from 'react'
import Button from '@material-ui/core/Button'

const StepButtons = (props) => {
  const {
    classes,
    activeStep,
    steps,
    handleReset,
    handleNext,
    handleBack,
    disabled,
    recipePosted,
    isEditing,
  } = props
  return (
    <div>
      <div>
        <div>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            className={classes.button}
          >
            Back
          </Button>

          <Button
            variant="contained"
            color={recipePosted ? 'secondary' : 'primary'}
            onClick={handleNext}
            className={classes.button}
            disabled={disabled || recipePosted}
          >
            {activeStep === steps.length - 1
              ? isEditing
                ? 'Save Changes'
                : 'Finish'
              : 'Next'}
          </Button>
          {recipePosted ? (
            <Button
              variant="contained"
              color="primary"
              disabled={disabled}
              onClick={handleReset}
              className={classes.button}
            >
              Reset
            </Button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  )
}

export default StepButtons
