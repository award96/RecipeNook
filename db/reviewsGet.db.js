const mysql = require('mysql')
const query = require('./query')

const all = async (recipeId) => {
  var sql = mysql.format(
    `   SELECT  ratings.id,
                ratings.review,
                ratings.star,
                ratings.posted,
                users.username,
                users.userpic,
                ratings.userID
        FROM ratings
        LEFT JOIN users
        ON (ratings.userID = users.id)
        WHERE ratings.recipeID=?
        AND review IS NOT NULL
        ORDER BY ratings.posted DESC, ratings.id DESC`,
    [recipeId],
  )
  return await query(sql)
}

module.exports = {
  all,
}
