const router = require('express').Router()
const SSE = require('sse-nodejs')
const serviceEventEmitter = require('../controllers/events/service_event')

router.get('/', (req, res, next) => {
    res.render('services');
})

router.get('/services-see', (req, res, next) => {

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

     serviceEventEmitter.removeListener('sicc', () => { console.log('listener removed!') });

})

module.exports = router