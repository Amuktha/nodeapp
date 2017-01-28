const expect = require('chai').expect
const request = require('supertest')
const app = require('../../app')

describe('GET /v1/recipes', function () {
  it('should return all recipes in the list', function (done) {
    request(app)
        .get('/v1/recipes')
        .expect(function (res) {
          expect(res.type).to.equal('application/json')
          expect(JSON.parse(res.text)[0].Name).to.equal('Lemon Chicken')
          expect(JSON.parse(res.text)[1].Name).to.equal('Beef Stroganoff')
          expect(JSON.parse(res.text)[2].Name).to.equal('Chicken Caesar Salad')
        })
        .expect(200, done)
  });

});

describe('GET /v1/recipes/:id', function () {
  it('should return a recipe', function (done) {
    request(app)
        .get('/v1/recipes/73748')
        .expect(function(res) {
          expect(res.type).to.equal('application/json')
          expect(JSON.parse(res.text)[0].Name).to.equal('Lemon Chicken')
          expect(typeof(JSON.parse(res.text))).to.equal('object')
        })
        .expect(200, done)
  });
});

describe('GET /v1/recipes/:id/image', function () {
  it('should return image of the recipe', function (done) {
    request(app)
        .get('/v1/recipes/73748/image')
        .expect(function (res) {
          console.log(res)

        }, done())
  });

});

// describe('POST /v1/recipes/:id', function () {
//   it('should create a recipe', function (done) {
//     // const app = helper.requireUncached('../app')
//     // app.get('/v1/recipes/lemonChicken')
//     const recipe = {
//       name: 'aaaa'
//     }
//
//     request(app)
//         .post('/v1/recipes/12345')
//         .send(recipe)
//         .expect(201, () => {
//           //asserts use expect
//           done()
//         });
//   });
// })


describe('GET /user', function () {
  it('user.name should be an case-insensitive match for "tobi"', function (done) {
    request(app)
        .get('/v1/recipes')
        .expect(function (res) {
          console.log(res.text)
          res.body.id = 'some fixed id';
          res.body.name = res.body.name.toUpperCase();
        })
        .expect(200, {
          id: 'some fixed id',
          name: 'TOBI'
        }, done);
  });
});