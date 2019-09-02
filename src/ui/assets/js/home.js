"use strict";

(() => {
   
   var eventSource = new EventSource('/services-see');

   // eventSource.onmessage = function (event) {
   // 	    console.log('onMessage ::', event);
   // };

   // eventSource.onopen = function (event) {
   // 	    console.log('onOpen ::', event);
   // };

   eventSource.onerror = function (event) {
   	    console.log('onError ::', event);
   };

   eventSource.addEventListener('critical', function (result) {
	    	console.log('Event Data :: ', result.data);
   });

})();