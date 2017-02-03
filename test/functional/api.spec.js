const expect = require('chai').expect
const request = require('supertest')
const app = require('../../app')

describe('GET /api/recipes', () => {
  it('should return all recipes in the list', (done) => {
    request(app)
        .get('/api/recipes')
        .expect(200)
        .end((err, res) => {
          expect(res.type).to.equal('application/json')
          const parsedResponse = JSON.parse(res.text)
          expect(parsedResponse[0].name).to.equal('Lemon Chicken')
          expect(parsedResponse[1].name).to.equal('Beef Stroganoff')
          expect(parsedResponse[2].name).to.equal('Chicken Caeser Salad')
          done()
        })
  })
});

describe('GET /api/recipes/:id', () => {
  it('should return a recipe with specific id', (done) => {
    request(app)
        .get('/api/recipes/73478')
        .expect(200)
        .end((err, res) => {
          expect(res.type).to.equal('application/json')
          const parsedResponse = JSON.parse(res.text)
          expect(typeof(JSON.parse(res.text))).to.equal('object')
          expect(parsedResponse.id).to.equal('73478')
          expect(parsedResponse.name).to.equal('Lemon Chicken')
          expect(parsedResponse.main_ingredients).to.equal('Chicken, Lemon, Thyme')
          expect(parsedResponse.image_url).to.equal('./resources/images/lemon_chicken.png')
          done()
        })
  })
  it('should return error when there is no recipe for the given id', (done) => {
    request(app)
        .get('/api/recipes/83979734')
        .expect(404)
        .end((err, res) => {
          const parsedResponse = JSON.parse(res.text)
          expect(res.res.statusMessage).to.equal('Not Found')
          expect(parsedResponse.err).to.equal("Sorry, this recipe doesn't exist or may have been removed")
          done()
        })
  })
})

describe('GET /api/recipes/:id/image', () => {
  it('should return image of the recipe', (done) => {
    request(app)
        .get('/api/recipes/73479/image')
        .expect(200)
        .end((err, res) => {
          expect(res.type).to.equal('image/gif')
          done()
        })
  })
  it('should return error when there is no image for a recipe', (done) => {
    request(app)
        .get('/api/recipes/7897987/image')
        .expect(404)
        .end((err, res) => {
          const parsedResponse = JSON.parse(res.text)
          expect(res.res.statusMessage).to.equal('Not Found')
          expect(JSON.parse(res.text).err).to.equal("Sorry, this recipe image doesn't exist or may have been removed")
          done()
        })
  })
})

describe('GET /api/recipes/filter/recipename', () => {
  it('should return filtered list of recipes matching recipe name', (done) => {
    request(app)
        .get('/api/recipes/filter/chicken')
        .expect(200)
        .end((err, res) => {
          expect(res.type).to.equal('application/json')
          const parsedResponse = JSON.parse(res.text)
          expect(parsedResponse.length).to.equal(2)
          expect(parsedResponse[0].name).to.equal('Lemon Chicken')
          expect(parsedResponse[1].name).to.equal('Chicken Caeser Salad')
          done()
        })
  })
  it('should return error when there is no recipes matching recipe name', (done) => {
    request(app)
        .get('/api/recipes/filter/iuyr')
        .expect(404)
        .end((err, res) => {
          const parsedResponse = JSON.parse(res.text)
          expect(res.res.statusMessage).to.equal('Not Found')
          expect(parsedResponse.err).to.equal("Sorry, we currently have no recipes for you with name 'iuyr'")
          done()
        })
  })
})

describe('GET /api/recipes/filter/ingredient/ingredientName', () => {
  it('should return filtered list of recipes matching ingredient name', (done) => {
    request(app)
        .get('/api/recipes/filter/ingredient/thyme')
        .expect(200)
        .end((err, res) => {
          expect(res.type).to.equal('application/json')
          const parsedResponse = JSON.parse(res.text)
          expect(parsedResponse.length).to.equal(1)
          expect(parsedResponse[0].name).to.equal('Lemon Chicken')
          done()
        })
  })
  it('should return error when there is no recipes matching ingredient name', (done) => {
    request(app)
        .get('/api/recipes/filter/ingredient/iuyr')
        .expect(404)
        .end((err, res) => {
          const parsedResponse = JSON.parse(res.text)
          expect(res.res.statusMessage).to.equal('Not Found')
          expect(parsedResponse.err).to.equal("Sorry, we currently have no recipes for you with ingredient 'iuyr'")
          done()
        })
  })
})


describe('GET /api/abc', () => {
  it('should return invalid api error', (done) => {
    request(app)
        .get('/api/abc')
        .expect(404)
        .end((err, res) => {
          expect(res.res.statusMessage).to.equal('Not Found')
          done()
        })
  })
})
