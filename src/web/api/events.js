const router = require('express').Router()
const SSE = require('sse-nodejs')
const event = require('../../subscribers/event_emitter')
const nodesCtrl = require('../../controllers/Nodes')



router.get('/', (req, res, next) => {

     let app = SSE(res)

     event.on('alteration', function(data) {
     	
     	    app.sendEvent('alteration', function () {
				// let nodes = await nodesCtrl.get_all_nodes()
				// return !nodes.length ? nodes : nodes.map(node => {
				// 	return {
				// 		node    : node.node, 
				// 		cluster : node.cluster,
				// 		domain  : node.domain, 
				// 		status  : node.status, 
				// 	   }
				// })

				return 'HI'  	    
			});
		 
		    app.disconnect(function () {
		        console.log("disconnected");
		    });
		 
		    app.removeEvent('alteration');
			event.removeAllListeners(['alteration'])
	 })
	 

})

module.exports = router