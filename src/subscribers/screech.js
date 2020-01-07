const queue = require('../jobs/queue')
const critical = require('../services/Critical')

queue.process('callEndpoint', (job, done) => {
      critical.callEndpoint()
              .then(() => done())
              .catch(error => done(error))
})

queue.process('runScript', (job, done) => {
      critical.runScript()
              .then(() => done())
              .catch(error => done(error))
})