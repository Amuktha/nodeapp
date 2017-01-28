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
        if(recipeId === item.id){
          data = item
        }
      })
      !data || err ? reject(err) : resolve(data)
    })
  })
}

exports.getFilteredRecipesByName = (filter) => {
  return new Promise((resolve, reject) => {
    fs.readFile(__dirname + '/resources/' + 'recipes.json', 'utf8', (err, data) => {
      var parsedData = JSON.parse(data)
      var filteredArray = []
      parsedData.forEach( (item) => {
        filter = filter.toLowerCase()
        if(new RegExp(filter).test(item.name)){
          filteredArray.push(item)
        }
      })
      data = filteredArray
      if(data.length == 0) reject(err)
      err ? reject(err) : resolve(data)
    })
  })
}

exports.getFilteredRecipesByIngredient = (filter) => {
  return new Promise((resolve,reject) => {
    fs.readFile(__dirname + '/resources/' + 'recipes.json', 'utf8', (err,data) => {
      var parsedData = JSON.parse(data)
      var filteredArray = []
      parsedData.forEach((item) => {
        filter = filter.toLowerCase()
        if(filter in item.ingredients){
          filteredArray.push(item)
        }
      })
      data = filteredArray
      if(data.length == 0) reject(err)
      err ? reject(err) : resolve(data)
    })
  })
}

