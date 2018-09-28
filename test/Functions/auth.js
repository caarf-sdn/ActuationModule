var request = require("request");

auth();

function auth() {

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    request.post({
        headers: { 'content-type': 'application/json' },
        url: 'https://10.192.168.121:8443/sdn/v2.0/auth',
        body: { "login": { "user": "sdn", "password": "skyline", "domain": "sdn" } },
        json: true
    }, function(error, body, response) {
        console.log(response.record.token);
    });

}

console.log("IGUAL = " + `${auth()}`)
