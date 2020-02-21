process.env.DEV_MODE = 'TEST'
// reset config dir env var to test path
process.env.NODES_CONF_DIRENAME = './test/conf_files/'

//Require the dev-dependencies
const chai = require('chai')
const should  = chai.should()
const chaiHttp = require('chai-http')
const server = require('../src/app')
const NodeModel = require('../src/models/node')
const configsReader = require('../src/controllers/ConfigsReader')

chai.use(chaiHttp)


//Our parent block
describe('Holter.js Unit Testing', () => {
    before(async () => {

          // clear redis
          const reply = await NodeModel.clear()

          // start reding node config from config dir (node_test.json)
          // then insert new node into redis
          const configs = await configsReader.setConfigs()
          console.log(`  reply: ${reply}, configs: ${ configs.length }`)
          console.log()
          console.log()
    })
/*
  * Test the /GET route
  */
  describe('GET /api/nodes/', () => {
      it('it should GET all the nodes', (done) => {
        chai.request(server)
        .get('/api/nodes/')
        .end((error, res) => {
            if(error) done(error)
            else{
                res.body.should.be.a('object')
                res.body.should.have.property('code').eql(200)
                // res.body.should.have.property('f_nodes')
                done()
            }
        })
      })
  })


  describe('GET /api/nodes/node_test', () => {
    it('it should GET specific node', (done) => {
        chai.request(server)
        .get('/api/nodes/node_test')
        .end((error, res) => {
            if(error) done(error)
            else{
                res.body.should.be.a('object')
                res.body.should.have.property('code').eql(200)
                // res.body.should.have.property('f_nodes')
                done()
            }
        })
      })
  })

  after(async () => {
    console.log()
    console.log()
    // clear redis
    const reply = await NodeModel.clear()
    console.log(`  reply: ${reply}`)
  })

})