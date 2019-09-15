const {client, redis} = require('../helpers/redis/connection/client')({})

module.exports.addOne = ($node) => {
    return new Promise( (resolve, reject) => {
       try {
            client.HMSET('node1',{
                "cluster"   : $node['cluster'],
                "node"      : $node['node'],
                "domain"    : $node['host'],
                "port"      : $node['port'],
                "path"      : $node['path'],
                "interval"  : $node['interval'],
                "onfailure" : JSON.stringify($node['onfailure'])
            }, (error, reply) => {
                if(error) reject(error)
                resolve()
            })
       } catch (error) {
           reject(error)
       }
    })
}

module.exports.getOne = ($node) => {
   return new Promise( (resolve, reject) => {
         try {
            client.hgetall($node, (error, reply) => {
                if(error) reject(error)
                resolve(reply)
            })
         } catch (error) {
             reject(error)
         }
   })
}

module.exports.getAll = () => {
    return new Promise( (resolve, reject) => {
        client.keys(`${ client['options']['prefix'] }*`, (error, reply) => {
            if (error) reject(error)
            resolve(reply)
        })
    })
}
