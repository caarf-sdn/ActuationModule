var auth = require('./auth_module').Auth;
var rp = require('request-promise');


var Mid = module.exports = {

    count: 1,
    token: "",

    //Busca e retorna token no banco em primeira visita
    //a partir da segunda retorna obj em memoria (if false) -
    //(if true - Atualiza junto ao controlador o token e atualiza nas estruturas)
    getToken: async function(up) {

        if (up == false) {

            if (Mid.count === 1) {

                await auth.getAuth().then(function(items) {

                    Mid.token = `${items.token}`;
                    Mid.count += 1;

                }, function(err) {
                    console.error('Promise rejeitada', err, err.stack);
                })

                return Mid.token;

            } else {
                return Mid.token;
            }

        }

        if (up == true) {

            return new Promise(async function(resolve, reject) {

                var user;
                var pass;

                process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

                auth.getAuth().then(async function(items) {

                    user = `${items.name}`
                    pass = `${items.password}`

                    var options = {
                        method: 'POST',
                        uri: 'https://10.192.168.121:8443/sdn/v2.0/auth',
                        body: { "login": { "user": `${user}`, "password": `${pass}`, "domain": "sdn" } },
                        json: true
                    };

                    try {
                        var repos = await rp(options);
                        Mid.token = repos.record.token

                    } catch (err) {

                        console.log(err.stack)
                        reject(false)
                    }
                    let result = await auth.updateToken(Mid.token);

                    if (result)
                        resolve(true)
                    else reject(false)
                })
            });
        }
    },

    //Retorna obj auth
    getUser: async function() {

        var result
        await (auth.getAuth().then(function(items) {

            result = items
        }, function(err) {
            console.error('Promise rejeitada', err, err.stack);
        }))

        return result
    }



}