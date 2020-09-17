import passwordValidator from 'password-validator'

/*
  Checks if username and password are valid (ie username must not contain symbols)
  Also checks if password and confirm password match/

  Params:
    username (String)
      - possible new username
    passowrd (String) (default empty)
      - possible new password
    passwordMatch (String) (default empty)
      - password confirm
    checkBoth (Bool) (default false)
      - if true check both username and password

  Returns:  errorMessage
    - empty if no rules were broken
    - otherwise is a string describing the broken rule
      to be passed directly to AlertBar component

*/
const usernamePasswordValidation = (
  username,
  password = '',
  passwordMatch = '',
  checkBoth = false,
) => {
  if (checkBoth) {
    var passwordSchema = new passwordValidator()
    passwordSchema.is().min(8) // 8 chars min
    passwordSchema.is().max(20) // 20 chars max
    passwordSchema.has().not().spaces() // no spaces
    passwordSchema.has().digits() // must contain at least 1 number
    passwordSchema.has().letters() // must contain at least 1 letter
  }

  var usernameSchema = new passwordValidator()
  usernameSchema.is().min(3) // 3 chars min
  usernameSchema.is().max(15) // 15 chars max
  usernameSchema.has().not().spaces() // no spaces
  usernameSchema.not().symbols() // no symbols
  // no emojis
  usernameSchema.not(
    '\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]',
  )

  // "invalid*" will be an array of short descriptions of rule broken
  // len = 0 if no rules broken
  let invalidPassword
  if (checkBoth) {
    invalidPassword = passwordSchema.validate(password, {list: true})
  }

  let invalidUsername = usernameSchema.validate(username, {list: true})

  let errorMessage = ''
  // convert short description to user friendly description
  let errorMatcher = {
    username: {
      min: 'Username must have at least 3 characters',
      max: 'Username must have be fewer than 15 characters',
      spaces: 'Username must not contain spaces',
      symbols: 'Username must not contain symbols',
      not: 'Username must not contain symbols',
    },
    password: {
      min: 'Password must have at least 8 characters',
      max: 'Password must be fewer than 20 characters',
      spaces: 'Password must not contain spaces',
      digits: 'Password must have at least one digit',
    },
  }
  if (invalidUsername.length > 0) {
    // there was a username rule broken
    errorMessage = errorMatcher.username[invalidUsername[0]]
  } else if (invalidPassword && invalidPassword.length > 0) {
    // there was a password rule broken
    errorMessage = errorMatcher.password[invalidPassword[0]]
  } else if (checkBoth && password !== passwordMatch) {
    // confirm password field was incorrect
    errorMessage = 'Passwords do not match'
  }
  // will be empty string if both arrays are 0 length
  return errorMessage
}

export default usernamePasswordValidation
