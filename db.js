const fs = require('fs')
const mysql = require('mysql2')
const config = require('./config')

let connection

function getConnection() {
  if (!connection) {
    connection = mysql.createConnection(config.db)
  }
  return connection
}

//Using file system but it should be a db in real case

exports.getRecipes = () => {
  return new Promise((resolve, reject) => {
    getConnection().execute('SELECT * from recipes', (err, result) => {
      resolve(result)
    })
  })
}

exports.getOneRecipe = (recipeId) => {
  return new Promise((resolve, reject) => {
    getConnection().execute('SELECT * from recipes where id=' + recipeId, (err, result) => {
      !result || result.length == 0|| err ? reject('Recipe not found') : resolve(result[0])
    })
  })
}

exports.getFilteredRecipesByName = (filter) => {
  return new Promise((resolve, reject) => {
    getConnection().execute('SELECT * from recipes where name LIKE "%' + filter + '%";', (err, result) => {
      !result || result.length == 0 || err ? reject('Recipe not found') : resolve(result)
    })
  })
}

exports.getFilteredRecipesByIngredient = (filter) => {
  return new Promise((resolve, reject) => {
    getConnection().execute('SELECT * from recipes where main_ingredients LIKE "%' + filter + '%";', (err, result) => {
      !result || result.length == 0 || result.length == 0 || err ? reject('Recipe not found') : resolve(result)
    })
  })
}

exports.getStarredRecipes = (profileId) => {
  return new Promise((resolve, reject) => {
    fs.readFile(__dirname + '/resources/' + 'users.json', 'utf8', (err, data) => {
      var parsedData = JSON.parse(data)
      const userProfile = parsedData.find((item) => profileId === item.id)
      const starredRecipe = userProfile.starredRecipes
      if (starredRecipe.length == 0) reject('No starred recipes found')
      err ? reject('No starred recipes found') : resolve(starredRecipe)
    })
  })
}

exports.getImageUrl = (recipeId) => {
  return new Promise((resolve, reject) => {
    getConnection().execute('SELECT image_url from recipes where id='+recipeId, (err, result) => {
      !result || result.length ==0 || err ? reject('Recipe not found') : resolve(result[0])
    })
  })
}

exports.postStarredRecipes = (profileId, recipeName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(__dirname + '/resources/' + 'users.json', 'utf8', (err, data) => {
      var parsedData = JSON.parse(data)
      const userProfile = parsedData.find((item) => profileId === item.id)
      if (!userProfile.starredRecipes.includes(recipeName)) {
        userProfile.starredRecipes.push(recipeName)
        const usersJson = JSON.stringify(parsedData);
        fs.writeFile(__dirname + '/resources/' + 'users.json', usersJson, (err, data) => {
          err ? reject('Error adding starred recipe') : resolve(userProfile.starredRecipes)
        })
      }
    })
  })
}
