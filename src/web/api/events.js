const router = require('express').Router()
const SSE = require('sse-nodejs')
const serviceEventEmitter = require('../server/services/controllers/events/service_event')


router.get('/events', (req, res, next) => {

     let app = SSE(res)

     serviceEventEmitter.on('sicc', function(data) {
     	
     	    app.sendEvent('critical', function() {
     	    	return data
     	    });
		 
		    app.disconnect(function () {
		        console.log("disconnected");
		    });
		 
		    app.removeEvent('critical');
     })

})

module.exports = router