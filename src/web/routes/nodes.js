const router = require('express').Router()

// const GetAllServices = require('../server/services/controllers/get_all_services.js') 

// const SSE = require('sse-nodejs')
// const serviceEventEmitter = require('../server/services/controllers/events/service_event')

router.get('/', (req, res, next) => {
    res.render('index', { pageName: 'home'});
})

router.get('/new-node', (req, res, next) => {
    res.render('AddNewNode', { pageName: 'addNNode' });
})

// router.get('/services', (req, res, next) => {
//     GetAllServices.get_all()
//                   .then(services => {
//                     res.status(200).json({
//                         status: 1,
//                         services: services,
//                         error: ''
//                     });
//                   }).catch(error => {
//                     res.status(200).json({
//                         status: 0,
//                         services: [],
//                         error: error.message
//                     });
//                   });
// })

// router.get('/services-see', (req, res, next) => {

//      let app = SSE(res)

//      serviceEventEmitter.on('sicc', function(data) {
     	
//      	    app.sendEvent('critical', function() {
//      	    	return data
//      	    });
		 
// 		    app.disconnect(function () {
// 		        console.log("disconnected");
// 		    });
		 
// 		    app.removeEvent('critical');
//      })

// })

module.exports = router