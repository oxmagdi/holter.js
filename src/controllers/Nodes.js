const NodeModel = require('../models/node')

/***********************/

function Nodes(){}

Nodes.prototype.getAllNodes = () => {
      return NodeModel.getAll()
    
}

/**
 * param
*/

Nodes.prototype.getOneNode = (nodeName) => {
      return NodeModel.getOne(nodeName)
}

/***********************/
module.exports = new Nodes()