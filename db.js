const fs = require('fs')
//Using file system but it should be a db in real case

exports.getRecipes = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(__dirname + '/resources/' + 'recipes.json', 'utf8', (err, data) => {
      !data || err ? reject(err) : resolve(data)
    })
  })
}

exports.getOneRecipe = (recipeId) => {
  return new Promise((resolve, reject) => {
    fs.readFile(__dirname + '/resources/' + 'recipes.json', 'utf8', (err, data) => {
      var parsedData = JSON.parse(data)
      const recipe = parsedData.find((item) => recipeId === item.id)
      !recipe || err ? reject('Recipe not found') : resolve(recipe)
    })
  })
}

exports.getFilteredRecipesByName = (filter) => {
  return new Promise((resolve, reject) => {
    fs.readFile(__dirname + '/resources/' + 'recipes.json', 'utf8', (err, data) => {
      var parsedData = JSON.parse(data)
      const recipes = parsedData.filter((item) => new RegExp(filter.toLowerCase()).test(item.name))
      if (recipes.length == 0) return reject('No filtered recipes found')
      err ? reject('No filtered recipes found') : resolve(recipes)
    })
  })
}

exports.getFilteredRecipesByIngredient = (filter) => {
  return new Promise((resolve, reject) => {
    fs.readFile(__dirname + '/resources/' + 'recipes.json', 'utf8', (err, data) => {
      var parsedData = JSON.parse(data)
      const filteredArray = parsedData.filter((item) => new RegExp(filter.toLowerCase()).test(item.main_ingredients))
      if (filteredArray.length == 0) reject('No filtered recipes found')
      err ? reject('No filtered recipes found') : resolve(filteredArray)
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

exports.getImage = (image) => {
  return new Promise((resolve, reject) => {
    fs.readFile(image, (err, data) => {
      !data || err ? reject(err) : resolve(data)
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
