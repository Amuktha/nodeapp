/* eslint-env mocha */
const expect = require('chai').expect
const mocha = require('mocha')
const db = require('../../db')
const fs = require('fs')
const sinon = require('sinon')
const chaiAsPromised = require('chai-as-promised')

describe('db', () => {
  describe(':getRecipes', () => {
    var sandbox
    beforeEach(() => {
      sandbox = sinon.sandbox.create()
    })

    afterEach(() => {
      sandbox.restore()
    })
    it('should return all the recipes', (done) => {
      sandbox.stub(fs, 'readFile').returns(Promise.resolve())
      return db.getRecipes().then(() => {
        expect(fs.readFile.calledOnce).to.equal(true)
        done()
      })
    })

    it('should return and catch the error', (done) => {
      sandbox.stub(fs, 'readFile').returns(Promise.reject())
      return db.getRecipes().catch(() => {
        expect(fs.readFile.calledOnce).to.eventually.equal(false).notify(done)
      })
    })
  })
  describe('getOneRecipe', (done) => {
    var sandbox
    beforeEach(() => {
      sandbox = sinon.sandbox.create()
    })

    afterEach(() => {
      sandbox.restore()
    })
    it('should return all the recipes', () => {
      var data = require('../resources/testRecipes.json')
      sandbox.stub(fs, 'readFile').returns(Promise.resolve(data))
      return db.getOneRecipe().then(() => {
        console.log('keiuriuer')
        done()
      })
    })
  })
  describe('getFilteredRecipesByName', (done) => {
    var sandbox
    beforeEach(() => {
      sandbox = sinon.sandbox.create()
    })

    afterEach(() => {
      sandbox.restore()
    })
    it('should return all the recipes', () => {
      var data = require('../resources/testRecipes.json')
      sandbox.stub(fs, 'readFile').returns(Promise.resolve(data))
      return db.getFilteredRecipesByName('chicken').then(() => {
        console.log('keiuriuer')
        done()
      })
    })
  })
  describe('getFilteredRecipesByIngredient', (done) => {
    var sandbox
    beforeEach(() => {
      sandbox = sinon.sandbox.create()
    })

    afterEach(() => {
      sandbox.restore()
    })
    it('should return all the recipes', () => {
      var data = require('../resources/testRecipes.json')
      sandbox.stub(fs, 'readFile').returns(Promise.resolve(data))
      return db.getFilteredRecipesByName('thyme').then(() => {
        console.log('keiuriuer')
        done()
      })
    })
  })

})
