const express = require('express');
const bodyParser = require('body-parser')
const request = require('supertest')
const app = express();
const db = require('./db')
const fs = require('fs')
const mongoose = require('mongoose')

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json({
  extended: true
}));

/*
 Recipe-list feature, getting a list of Recipes
 */
app.get('/api/recipes', (req, res) => {
  db.getRecipes().then((response) => {
    res.setHeader('content-type', 'application/json')
    res.send(response)
  }).catch(() => {
    res.status(404).json({err: "Sorry, we currently have no recipes for you"});
  })
})

/*
 Get details of a specific recipe
 */
app.get('/api/recipes/:id', (req, res) => {
  db.getOneRecipe(req.params.id).then((response) => {
    res.setHeader('content-type', 'application/json')
    res.send(response)
  }).catch(() => {
    res.status(404).json({err: "Sorry, this recipe doesn't exist or may have been removed"});
  })
})

/*
 Get image of a recipe
 */
app.get('/api/recipes/:id/image', (req, res) => {
  db.getOneRecipe(req.params.id).then((response) => {
    var img = fs.readFileSync(response.image_url)
    res.writeHead(200, {'Content-Type': 'image/gif'})
    res.end(img, 'binary')
  }).catch(() => {
    res.status(404).json({err: "Sorry, this recipe image doesn't exist or may have been removed"});
  })
})


/*
 Filter recipes with recipe name
 */
app.get('/api/recipes/filter/:filter', (req, res) => {
  db.getFilteredRecipesByName(req.params.filter).then((response) => {
    res.setHeader('content-type', 'application/json')
    res.send(response)
  }).catch(() => {
    res.status(404).json({err: "Sorry, we currently have no recipes for you with name '" + req.params.filter+"'"});
  })
})

/*
 Filter recipes with recipe ingredient
 */
app.get('/api/recipes/filter/ingredient/:filter', (req, res) => {
  db.getFilteredRecipesByIngredient(req.params.filter).then((response) => {
    res.setHeader('content-type', 'application/json')
    res.send(response)
  }).catch(() => {
    res.status(404).json({err: "Sorry, we currently have no recipes for you with ingredient '" + req.params.filter+"'"});
  })
})

module.exports = app

app.listen(3000, function () {
  console.log('app listening at port 3000!')
});
