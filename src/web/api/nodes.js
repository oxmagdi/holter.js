const router = require('express').Router()
const nodesCtrl = require('../../controllers/Nodes')
const logger = require('../../libs/logger/logger')

/******************************/

router.get('/', (req, res) => {
    nodesCtrl.getAllNodes()
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

router.get('/:node', (req, res) => {
    nodesCtrl.getOneNode(req.params['node'])
     .then(node => {
        res.status(200).json({
            code: 200,
            node,
        })
     }).catch(error=> {
        res.status(200).json({
            code: 403,
            error,
        })
     })
})


router.post('/', (req, res) => {
        logger.info(`[POST /api/nodes/] with new node ->  ${req.body.cluster}:${req.body.node}`)
        res.status(200).json({
            code: 200,
            body: req.body,
        })

})

/******************************/
module.exports = router