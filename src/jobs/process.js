const request = require('request')
const queue = require('../libs/kue/connection/client')

const util = require('util')
const exec = util.promisify(require('child_process').exec)

/************************************************* */


queue.process('callEndpoint', (job, done) => {
      
      const endpoint = job.data.onfailure

      request(endpoint.url, { json: true, body: endpoint.body, }, (error, res, body) => {
            if (error) done(error)
            else done(null, body)
      })
})

queue.process('runScript', async (job, done) => {

      const command = job.data.onfailure.command

      const { stdout, stderr } = await exec(command)
      if(stderr) done(new Error(stderr))
      else done(null, stdout)
})