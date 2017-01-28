const express = require('express');
const bodyParser = require('body-parser')
const request = require('supertest')
const app = express();
const db = require('./db')
const fs = require('fs')

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json({
  extended: true
}));

/*
  Recipe-list feature, getting a list of Recipes
 */
app.get('/v1/recipes', (req, res) => {
   db.getRecipes().then((response) => {
     res.setHeader('content-type', 'application/json')
     res.send(response)
   }).catch(() => {
     res.status(404).json({err:"Sorry, we currently have no recipes for you"});
   })
})

/*
 Get details of a specific recipe
 */
app.get('/v1/recipes/:id', (req, res) => {
  db.getOneRecipe(req.params.id).then((response) => {
    res.setHeader('content-type', 'application/json')
    res.send(response)
  }).catch( () => {
    res.status(404).json({err:"Sorry, this recipe doesn't exist or may have been removed"});
  })
})

/*
Get image of a recipe
 */
app.get('/v1/recipes/:id/image', (req,res) => {
  console.log(req.params.id)
  db.getOneRecipe(req.params.id).then((response) => {
    console.log('This is the resposne')
    var img = fs.readFileSync(JSON.parse(response).Image_URL);
    res.writeHead(200, {'Content-Type': 'image/gif' });
    res.end(img, 'binary');
  }).catch( () => {
    res.status(404).json({err:"Sorry, this recipe doesn't exist or may have been removed"});
  })
})

//
// app.get('v1/profile/profileid/starred recipes', (req, res) => {
// })
//
// app.post('v1/profile/profileid/starredrecipes', (req, res) => {
//   db.createRecipe(req.body).then(() => {
//     res.json()
//   }).catach(() => {
//     res.status(500).json({ err: 'woops' });
//   })
// })
//
// app.delete('v1/profile/profileid/starredrecipes', (req, res) => {
// })

module.exports = app

// app.post('/v1/users', function(req,res){
//     fs.readFile(__dirname + "/resources/" + "users.json", 'utf8', function readFileCallback(err, data){
//         if (err){
//             console.log(err);
//         } else {
//             obj = JSON.parse(data); //now it an object
//             obj.push(req.body); //add some data
//             json = JSON.stringify(obj); //convert it back to json
//             fs.writeFile('myjsonfile.json', json, 'utf8', callback); // write it back
//         }});

//
//     res.send(req.body);
// });
app.listen(3000, function() {
});