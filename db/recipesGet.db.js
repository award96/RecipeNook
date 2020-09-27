const mysql = require('mysql')
const query = require('./query')

const recipeSQL = `SELECT  recipes.id,
                            recipes.title,
                            recipes.updated,
                            avg_stars.stars,
                            avg_stars.countStars,
                            recipes.favorites,
                            recipes.tagline,
                            recipes.img,
                            recipes.userId,
                            users.username,
                            users.email,
                            users.userpic
                    FROM recipes
                    LEFT JOIN users
                    ON (recipes.userId = users.id)
                    LEFT JOIN (
                      SELECT
                      ratings.recipeID as recipeID,
                      AVG(ratings.star) AS stars,
                      COUNT(ratings.star) as countStars
                      FROM ratings
                      GROUP BY ratings.recipeID
                    )
                    AS avg_stars
                    ON (recipes.id = avg_stars.recipeID)
                    `
const all = async () => {
  let allSQL = recipeSQL + 'ORDER BY rand()'
  return await query(allSQL)
}

const search = async (search) => {
  let searchSQL = '%' + search + '%'
  let sqlString =
    recipeSQL +
    ` WHERE recipes.title LIKE ?
                                OR recipes.tagline LIKE ?
                                GROUP BY recipes.id`
  let sql = mysql.format(sqlString, [searchSQL, searchSQL])
  return await query(sql)
}

const single = async (recipeId) => {
  let sqlString = recipeSQL + 'WHERE recipes.id = ?'
  let sql = mysql.format(sqlString, [recipeId])
  return await query(sql)
}

const ingredients = async (recipeId) => {
  let sql = mysql.format(
    'SELECT ingredient FROM ingredients WHERE recipeId = ?',
    [recipeId],
  )
  return await query(sql)
}

const directions = async (recipeId) => {
  let sql = mysql.format(
    'SELECT direction FROM directions WHERE recipeId = ?',
    [recipeId],
  )
  return await query(sql)
}

module.exports = {
  all,
  search,
  single,
  ingredients,
  directions,
}
