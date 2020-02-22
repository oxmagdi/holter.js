"use strict";



(() => {
    fill_service_list();
  
    function fill_service_list (services){
    fetch('/api/nodes', {
        method:'GET',
        headers: {
          'Accept': 'application/json',
          'Content-type':'application/json'
        },
      })
      .then((res) => res.json())
      .then((data) => {

           if(data['f_nodes'].length > 0){

               var nodes = data['f_nodes'];
               console.log(nodes)
               var body = ``;

               nodes.forEach((node, index, array) => {

                   body += ` 
                      <li id="${node.node}" data-running="true">
                          <div class="uk-card uk-card-default uk-card-body uk-text-large">
                              <i class="fa fa-circle fa-xl" style="color: ${ node.status == -1 ? 'orange' : node.status == 0 ? 'red': 'green'};" aria-hidden="true"></i> ${ node.node }
                          </div>
                      </li>
                      `;
                  if(index == array.length -1) 
                     document.getElementById('services_list').innerHTML = body;
               });

           }
      });
   }
   
     let interval = setInterval(fill_service_list, 2500);

})();

(() => {

   console.log('second block!');
   
   var eventSource = new EventSource('/api/events');

//    eventSource.onmessage = function (event) {
//    	    console.log('onMessage ::', event);
//    };

//    eventSource.onopen = function (event) {
//    	    console.log('onOpen ::', event);
//    };

   eventSource.onerror = function (event) {
   	    console.log('onError ::', event);
   };

   eventSource.addEventListener('alteration', function (e) {
         console.log('e : ', e)
         console.log('e data : ', e.data)
         var data = JSON.parse(e.data);
	    	console.log('Event Data :: ', data);
        //  update_service(service);
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