const NodeModel = require('../models/node')
const config = require('../config/conf')
const fs = require('fs')

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

/**
 * param
*/

Nodes.prototype.addOne = async (node) => {
      try {
            await NodeModel.addOne(node)
            const data = await JSON.stringify(node);
            await fs.writeFileSync(`${config.dirname}/${node.node}.json`, data)
      } catch (error) {
            return new Error(error)
      }
}

/***********************/
module.exports = new Nodes()