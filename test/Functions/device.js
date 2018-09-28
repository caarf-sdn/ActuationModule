
var request = require("request");

function devices(token){
        
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

        request.get({
            headers: {'content-type' : 'application/json','X-Auth-Token' : token },
            url:     'https://10.192.168.121:8443/sdn/v2.0/net/devices',
            body:  null,
            json : true
          }, function(error, body, response){
            
            console.log(response);
            return response;
          
          });
}