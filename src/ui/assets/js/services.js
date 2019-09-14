"use strict";



(() => {
   
   function fill_service_list (services){
       if(services.length > 0) {

         var body = ``;

         services.forEach((s, index, array) => {

             body += `
                       <li data-running="${ s['alive'] }">
                          <div class="uk-card uk-card-default uk-card-body uk-text-large">
                               <i class="fa fa-circle fa-xl ${ s['alive'] ? 'success' : 'danger'}" aria-hidden="true"></i> ${ s.node }
                          </div>
                      </li>
             `;  

             if(index == array.length -1 ) 
                document.getElementById('services_list').innerHTML = body;
         });
       }
   }
   
      fetch('/services', {
        method:'GET',
        headers: {
          'Accept': 'application/json',
          'Content-type':'application/json'
        },
      })
      .then((res) => res.json())
      .then((data) => {

           if(data['services'].length > 0){

               var services = data.services;
               var body = ``;

               services.forEach((node, index, array) => {
                    body += ` 
                         <li id="${node}" data-running="true">
                             <div class="uk-card uk-card-default uk-card-body uk-text-large">
                                  <i class="fa fa-circle fa-xl success" aria-hidden="true"></i> ${ node }
                             </div>
                         </li>
                    `;

                    if(index == array.length -1) 
                     document.getElementById('services_list').innerHTML = body;
               });

           }
      });

})();

(() => {

   console.log('second block!');
   
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
         var service = JSON.parse(result.data);
	    	console.log('Event Data :: ', service);
         update_service(service);
   });


   function update_service (service){
       console.log(service.node)
       var s = document.getElementById(service.node);

       s.setAttribute("data-running", "false"); 
       s.innerHTML = ` 
               <div class="uk-card uk-card-default uk-card-body uk-text-large">
                  <i class="fa fa-circle fa-xl danger" aria-hidden="true"></i> ${ service.node }
               </div>
       `;
   }
})();