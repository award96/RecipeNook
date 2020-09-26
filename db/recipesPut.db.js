const mysql = require('mysql')
const query = require('./query')

const put = async (recipeId, title, tagline, img) => {
  let sql = mysql.format(
    `
        UPDATE recipes
        SET title = ?,
            tagline = ?,
            img = ?,
            updated = curdate()
        WHERE id = ?`,
    [title, tagline, img, recipeId],
  )
  return await query(sql)
}

module.exports = {
  put,
}
