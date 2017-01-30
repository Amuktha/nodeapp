/* eslint-env mocha */
const chai = require('chai')
const mocha = require('mocha')
const db = require('../../db')
const fs = require('fs')
const sinon = require('sinon')
const chaiAsPromised = require('chai-as-promised')

chai.should()
chai.use(chaiAsPromised)

const expect = chai.expect
const data = [
  {
    "id": "73478",
    "name": "lemon chicken",
    "cooking_time": "30 minutes",
    "main_ingredients": "chicken, lemon, thyme",
    "ingredients": {
      "chicken_breasts":4,
      "thyme":"1tsp",
      "lemon": 1
    },
    "image_url": "./resources/images/lemon_chicken.png"
  },
  {
    "id": "73479",
    "name": "beef stroganoff",
    "cooking_time": "30 minutes",
    "main_ingredients": "beef, mustard, mushrooms",
    "ingredients": {
      "beef_slices":4,
      "mustard": "2tsp",
      "mushrooms": 10
    },
    "image_url": "./resources/images/beef_stroganoff.png"
  }
]

describe('db', () => {
  describe('getRecipes', () => {
    let sandbox
    beforeEach(() => {
      sandbox = sinon.sandbox.create()
    })

    afterEach(() => {
      sandbox.restore()
    })

    it('should return all the recipes', (done) => {
      sandbox.stub(fs, 'readFile').yields(null, data)
      db.getRecipes().should.eventually.deep.equal(data).notify(done)
    })

    it('should catch the error', (done) => {
      sandbox.stub(fs, 'readFile').yields('err', null)
      db.getRecipes().should.be.rejectedWith('err').notify(done)
    })
  })
  describe('getOneRecipe', () => {
    let sandbox
    beforeEach(() => {
      sandbox = sinon.sandbox.create()
    })

    afterEach(() => {
      sandbox.restore()
    })
    it('should return one recipe', () => {
      sandbox.stub(fs, 'readFile').yields(null, JSON.stringify(data))
      db.getOneRecipe('73478').then((result) => {
        expect(fs.readFile.calledOnce).to.equal(true)
        expect(result.id).to.equal('73478')
        expect(result.name).to.equal('lemon chicken')
      })
    })
    it('should return err when no recipes found', () => {
      sandbox.stub(fs, 'readFile').yields(null, JSON.stringify(data))
      db.getOneRecipe('abc').catch((err) => {
        expect(fs.readFile.calledOnce).to.equal(true)
        expect(err).to.equal('Recipe not found')
      })
    })
  })
  describe('getFilteredRecipesByName', () => {
    let sandbox
    beforeEach(() => {
      sandbox = sinon.sandbox.create()
    })

    afterEach(() => {
      sandbox.restore()
    })
    it('should return all the recipes', (done) => {
      sandbox.stub(fs, 'readFile').yields(null, JSON.stringify(data))
      db.getFilteredRecipesByName('chicken').then((result) => {
        expect(result[0].id).to.equal('73478')
        expect(result[0].name).to.equal('lemon chicken')
        done()
      })
    })
    it('should throw an error if no filtered recipes by name', (done) => {
      sandbox.stub(fs, 'readFile').yields(null, JSON.stringify(data))
      db.getFilteredRecipesByName('uy').catch((err) => {
        expect(fs.readFile.calledOnce).to.equal(true)
        expect(err).to.equal('No filtered recipes found')
        done()
      })
    })
  })
  describe('getFilteredRecipesByIngredient', () => {
    let sandbox
    beforeEach(() => {
      sandbox = sinon.sandbox.create()
    })

    afterEach(() => {
      sandbox.restore()
    })
    it('should return all the recipes matching the main ingredient name provided', (done) => {
      sandbox.stub(fs, 'readFile').yields(null, JSON.stringify(data))
      db.getFilteredRecipesByIngredient('mushrooms').then((result) => {
        expect(fs.readFile.calledOnce).to.equal(true)
        expect(result[0].id).to.equal('73479')
        expect(result[0].name).to.equal('beef stroganoff')
        done()
      })
    })
    it('should throw an error if no filtered recipes by ingredient', (done) => {
      sandbox.stub(fs, 'readFile').yields(null, JSON.stringify(data))
      db.getFilteredRecipesByName('uy').catch((err) => {
        expect(fs.readFile.calledOnce).to.equal(true)
        expect(err).to.equal('No filtered recipes found')
        done()
      })
    })
  })
})
