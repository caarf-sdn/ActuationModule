var MongoClient = require('mongodb').MongoClient;
var auth = require('./classes/auth_module.js').Auth;
var request = require("request");
var mid = require('./classes/midAuth.js');

module.exports.init = function(init, username, password) {


    return new Promise(async function(resolve, reject) {

        if (init) {
            console.log("Init True\n\n")
            var url = "mongodb://127.0.0.1:27017/Caarf"
            
            await MongoClient.connect(url, function(err, db) {

                if (err) {
                    console.log("Database creation error")
                    reject(err)
                    throw err
                }
                console.log("1 - Database created!")
                db.close()
            });

            await MongoClient.connect(url, function(err, db) {

                var dbo = db.db("Caarf")

                dbo.createCollection("auth", function(err, res) {
                    if (err) {
                        console.log("Collection creation error")
                        reject(err)
                        throw err
                    }
                    console.log("2 - Collection created!")
                    db.close()
                });

            });

            MongoClient.connect(url, function(err, db) {

                var dbo = db.db("Caarf");

                var myobj = { name: username, password: password, token: "" }

                dbo.collection("auth").insertOne(myobj, function(err, res) {

                    if (err) {
                        console.log("Collection insert error")
                        reject(err)
                        throw err
                    }
                    console.log("3 - Document inserted")

                    let result;
                    mid.obterToken(true).then(function(response) {

                        result = response

                        if (result != null) {
                            console.log('4 - Db Atualizado')
                            resolve(console.log("Init Finalizado"))
                        }

                    }).catch(function(err) {

                        console.log("Erro durante atualização do token no banco")
                    })
                });

                db.close()
            });

        } else reject(console.log('Init false'))


    });


}