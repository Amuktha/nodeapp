const fs = require('fs')

exports.getRecipes = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(__dirname + '/resources/' + 'recipes.json', 'utf8', (err, data) => {
      err ? reject(err) : resolve(data)
    })
  })
}

exports.getOneRecipe = (recipeId) => {
  return new Promise((resolve, reject) => {
    fs.readFile(__dirname + '/resources/' + 'recipes.json', 'utf8', (err, data) => {
      var parsedData = JSON.parse(data)
      parsedData.forEach( (item) => {
        if(recipeId === item.Id){
          data = item
        }
      })
      err ? reject(err) : resolve(data)
    })
  })
}

