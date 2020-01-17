const router = require('express').Router()
const nodesCtrl = require('../../controllers/Nodes')

router.get('/', (req, res) => {
    nodesCtrl.get_all_nodes()
     .then(nodes => {
         let f_nodes = !nodes.length ? nodes : nodes.map(node => {
             return {
                 node    : node.node, 
                 cluster : node.cluster,
                 domain  : node.domain, 
                 status  : node.status, 
                }
         })
        res.status(200).json({
            code: 200,
            f_nodes,
        })
     }).catch(error=> {
        res.status(200).json({
            code: 403,
            error,
        })
     })
})

module.exports = router