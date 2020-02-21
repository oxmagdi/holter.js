const {client, redis} = require('../libs/redis/connection/client')({})

module.exports.addOne = ($node) => {
    return new Promise( (resolve, reject) => {
       try {
            client.HMSET(`:${$node['cluster']}:${$node['node']}`,{
                "cluster"   : $node['cluster'],
                "node"      : $node['node'],
                "status"    : '-1',
                "domain"    : $node['host'],
                "port"      : $node['port'],
                "path"      : $node['path'],
                "interval"  : $node['interval'],
                "onfailure" : $node['onfailure'] && Object.keys($node['onfailure']).length ? JSON.stringify($node['onfailure']) : 'NON'
            }, (error, reply) => {
                if(error) reject(error)
                resolve()
            })
       } catch (error) {
           reject(error)
       }
    })
}

module.exports.getStatus = ($key, $num) => {
    return new Promise( (resolve, reject) => {
        try {
             client.hget($key, "status", (error, reply) => {
                 if(error) reject(error)
                 resolve(reply)
             })
        } catch (error) {
            reject(error)
        }
     })
}

module.exports.upStatus = ($key, $num) => {
    return new Promise( (resolve, reject) => {
        try {
             client.HMSET($key, { "status" : `${$num}`,} , (error, reply) => {
                 if(error) reject(error)
                //  console.log(reply)
                //  console.log($key)
                 resolve()
             })
        } catch (error) {
            reject(error)
        }
     })
}

module.exports.getOne = ($nodeName) => {
   return new Promise( (resolve, reject) => {
         try {
            client.hgetall($nodeName, (error, reply) => {
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

module.exports.clear = () => {
    return new Promise( (resolve, reject) => {
        client.keys(`${ client['options']['prefix'] }*`, (error, reply) => {
            if (error) reject(error)
            else if (reply.length > 0){
              reply.forEach((key, index, array) => {
                 let rkey = key.replace(client['options']['prefix'], '')
                 client.DEL(rkey, (error, reply) => {
                      if (error) reject(error)
                      if(index == array.length -1) resolve(1)
                  })
              })
            }else resolve(3)
        })
    })
}