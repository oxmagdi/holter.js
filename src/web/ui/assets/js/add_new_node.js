

var node = document.getElementById('node');
var cluster = document.getElementById('cluster');
var host = document.getElementById('host');
var port = document.getElementById('port');
var path = document.getElementById('path');
var cmd = document.getElementById('cmd');
var uri = document.getElementById('uri');
var method = document.getElementById('method');
var header = document.getElementById('header');
var body = document.getElementById('body');
var onfailure = document.getElementById('onfailurOpt');

var cmdContainer = document.getElementById('cmdC');
var uriContainer = document.getElementById('uriC');
var methodContainer = document.getElementById('methodC');
var headerContainer = document.getElementById('headerC');
var bodyContainer = document.getElementById('bodyC');

var nodeForm = document.getElementById('nodeForm');

var nodeErr = document.getElementById('nodeErr');
var clusterErr = document.getElementById('clusterErr');
var hostErr = document.getElementById('hostErr');
var portErr = document.getElementById('portErr');
var pathErr = document.getElementById('pathErr');
var cmdErr = document.getElementById('cmdErr');
var uriErr = document.getElementById('uriErr');
var methodErr = document.getElementById('methodErr');
var headerErr = document.getElementById('headerErr');


initDisplayOnFailuer();


onfailure.onchange = function(ev) {
    if(this.value == 'script') {
        displayCMD();
    } else if(this.value == 'endpoint'){
        displayEndpoint();
    } else {
        initDisplayOnFailuer();
    }
};

nodeForm.onsubmit = function(ev) {
    ev.preventDefault();
    console.log("From is fired");

    if(checkFormIsValid()) {
        var data = getFormObject();
         fetch('/api/nodes', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            UIkit.notification({
                message: 'Node Added Successfuly',
                status: 'primary',
                pos: 'top-right',
                timeout: 5000
            });
        })
        .catch((error) => {
            console.error('Error:', error);
            UIkit.notification({
                message: 'Something goes Wrong!',
                status: 'danger',
                pos: 'top-right',
                timeout: 5000
            });
        });
    } else {
        UIkit.notification({
            message: 'Something goes Wrong!',
            status: 'danger',
            pos: 'top-right',
            timeout: 5000
        });
    }
};

//---------------Func---------------------------------------
/**
 * 
 */
function displayEndpoint () {
    cmdContainer.style.display = 'none';
    uriContainer.style.display = 'block';
    methodContainer.style.display = 'block';
    headerContainer.style.display = 'block';
    bodyContainer.style.display = 'block';
}

function displayCMD () {
    cmdContainer.style.display = 'block';
    uriContainer.style.display = 'none';
    methodContainer.style.display = 'none';
    headerContainer.style.display = 'none';
    bodyContainer.style.display = 'none';
}

function initDisplayOnFailuer () {
    cmdContainer.style.display = 'none';
    uriContainer.style.display = 'none';
    methodContainer.style.display = 'none';
    headerContainer.style.display = 'none';
    bodyContainer.style.display = 'none';
}

function getFormObject() {

    var formObj = {
        node: node.value,
        cluster: cluster.value,
        host: host.value,
        port: port.value,
        path: path.value,
        onfailure:{}
    }

    if(onfailure.value == 'script') return {
        ...formObj,
        onfailure: {
            cmd: cmd.value
        }
    };

    else if(onfailure.value == 'endpoint') return {
        ...formObj, 
        onfailure: {
            uri: uri.value,
            method: method.value,
            header: header.value,
            body: body.value,
        }
    };

    return formObj;

}

function checkFormIsValid() {
     var valid = true;
     if(!node.value) {
         valid = false;
         setInputError(nodeErr, 'required!')
     } else {
         clearInputError(nodeErr);
     }

     if(!cluster.value) {
        valid = false;
        setInputError(clusterErr, 'required!')
    } else {
        clearInputError(clusterErr);
    }

    if(!host.value) {
        valid = false;
        setInputError(hostErr, 'required!')
    } else {
        clearInputError(hostErr);
    }

    if(!port.value) {
        valid = false;
        setInputError(portErr, 'required!')
    } else {
        clearInputError(portErr);
    }

    if(!path.value) {
        valid = false;
        setInputError(pathErr, 'required!')
    } else {
        clearInputError(pathErr);
    }

    if(onfailure.value == 'script') {
        if(!cmd.value) {
            valid = false;
            setInputError(cmdErr, 'required!')
        } else {
            clearInputError(cmdErr);
        }
    }else if (onfailure.value == 'endpoint'){
        if(!uri.value) {
            valid = false;
            setInputError(uriErr, 'required!')
        } else {
            clearInputError(uriErr);
        }

        if(!method.value) {
            valid = false;
            setInputError(methodErr, 'required!')
        } else {
            clearInputError(methodErr);
        }
    } 

     return valid;
}

function setInputError(el, msg) {
     el.innerHTML = msg;
}

function clearInputError(el) {
    el.innerHTML = '';
}