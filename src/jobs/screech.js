const queue = require('./queue')

module.exports.screech = (data) => {
    return new Promise ( (resolve, reject) => {
        let job = queue.create('screech', data).save( (error) => {
           if( !error ) resolve( job.id )
        })
    })
}