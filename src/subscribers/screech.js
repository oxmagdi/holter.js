const queue = require('../libs/kue/connection/client')

/******************* */

module.exports = ($node) => {
    return new Promise( (resolve, reject) => {
          // console.log($node)
          // console.log(typeof $node['onfailure'])
          
          const typeNotNON = $node.onfailure != 'NON' || !Object.keys($node.onfailure).length
          const onfailure =  typeNotNON ? JSON.parse($node['onfailure']) : 0
          const type = typeNotNON ? onfailure.type : 'NON'

          if(type == 'endpoint'){

                let job = queue.create('callEndpoint', {...$node, onfailure, title: `${$node.cluster}.${$node.node} is down ..`})
                               .save( function(err){
                                   if( err ) reject( err )
                                   else resolve( job.id )
                                })

          } else if(type == 'script'){

                let job = queue.create('runScript', {...$node, onfailure, title: `${$node.cluster}.${$node.node} is down ..`})
                            .save( function(err){
                                if( err ) reject( err )
                                else resolve( job.id )
                            })
                            
          }
    })
}


 