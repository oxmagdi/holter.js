const {client, redis} = require('../helpers/redis/connection/client')({})

module.exports.addOne = ($node) => {
    return new Promise( (resolve, reject) => {
       try {
            client.HMSET(`${$node['cluster']}:${$node['node']}`,{
                "cluster"   : $node['cluster'],
                "node"      : $node['node'],
                "status"    : '-1',
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
            else if (reply.length > 0){
                let allNods = []
                reply.forEach( (key, index, array) => {
                    let rkey = key.replace(client['options']['prefix'], '')
                    client.hgetall(rkey, (error, node) => {
                        if(error) reject(error)
                        node.onfailure = node.onfailure == 'undefined' ? {} : node.onfailure
                        allNods.push(node)
                        if(index == array.length -1) {
                            resolve(allNods)
                        }
                    })
                })
            } else resolve([]) 
        })
    })
}

module.exports.getAllKeys = () => {
    return new Promise( (resolve, reject) => {
        client.keys(`${ client['options']['prefix'] }*`, (error, reply) => {
            if (error) reject(error)
            resolve(reply)
        })
    })
}