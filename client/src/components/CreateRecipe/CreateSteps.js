import React from 'react'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'

const CreateSteps = (props) => {
  const {classes, activeStep, steps} = props

  return (
    <div className={classes.StepRoot}>
      <Stepper activeStep={activeStep} className={classes.stepper}>
        {steps.map((label) => {
          const stepProps = {}
          const labelProps = {}
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          )
        })}
      </Stepper>
    </div>
  )
}

export default CreateSteps
