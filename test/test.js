//Require the dev-dependencies
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../src/app')

chai.use(chaiHttp)

//Our parent block
describe('Books', () => {
    beforeEach((done) => { //Before each test we empty the database
           console.log("Before >>>")
           done()      
    })
/*
  * Test the /GET route
  */
  describe('/GET nodes', () => {
      it('it should GET all the nodes', (done) => {

              done()

      })
  })

})