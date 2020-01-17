const NodeModel = require('../models/node')

/***********************/

function Nodes(){}

Nodes.prototype.get_all_nodes = async () => {
 return new Promise((resolve, reject) => {
       NodeModel.getAll()
        .then(nodes => resolve(nodes))
        .catch(error => reject(error))
 })    
}

/***********************/
module.exports = new Nodes()