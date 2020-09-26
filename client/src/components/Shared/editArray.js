/*
  take an array of favorited recipeId's or followed userId's and either
  add or remove a new item, depending on whether it is currently present in the array or not
*/

const editArray = (oldArray, newInsertId) => {
  if (typeof oldArray !== 'object') {
    throw new Error('Incorrect type')
  }
  let index = oldArray.findIndex((thisId) => thisId === newInsertId)
  if (index === -1) {
    // not present
    oldArray.push(newInsertId)
  } else {
    oldArray.splice(index, 1)
  }
  return [...oldArray]
}

export default editArray
