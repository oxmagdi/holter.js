const queue = require('../jobs/queue')
const critical = require('../services/Critical')

queue.process('screech', (job, done) => {
      critical(job.data).then( () =>  done() ).catch( error => done(error) )
})