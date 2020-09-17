import React from 'react'
import {AccountForm} from '../components/index'

// Because login and create account share the same logic,
// having this page be a wrapper keeps the code DRY
const CreateAccount = (props) => {
  const {routes} = props
  return <AccountForm createAccount={true} routes={routes} />
}

export default CreateAccount
