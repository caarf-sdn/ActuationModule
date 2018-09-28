var MongoClient = require('mongodb').MongoClient;
//Caminho do banco(mudar o parser)
var url = "mongodb://localhost:27017/";



var Auth = function() {};

//Atualiza o Obj de autenticação no db
Auth.prototype.updateUser = function(username, password, token) {


    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("Caarf");

        var myobj = { name: username, password: password, token: token };

        dbo.collection("auth").update(dbo.collection("auth").findOne(), myobj, function(err, res) {

            if (err) throw err;
            // console.log("updated");
            db.close();
            return res;
        });
    });

};

//Retorna o obj de autenticação (user,pass,token)
Auth.prototype.getAuth = function() {

    return MongoClient.connect(url).then(function(db) {

        //Nome do banco de dados
        var dbo = db.db("Caarf");
        var collection = dbo.collection('auth');

        return collection.findOne();

    }).then(function(auth) {
        //console.log(auth);
        return auth;

    });

};

//Atualiza Token no db
Auth.prototype.updateToken = function(token) {

    return new Promise(async function(resolve, reject) {

        await MongoClient.connect(url, async function(err, db) {

            if (err) {
                console.log("Erro durante conexão com o banco(atualização do token), verifique conexão.")
                reject(false);
            }
            //Nome do Banco
            var dbo = db.db("Caarf");
            //Coolection (equivalente a tabela em relational dbs)
            var item1 = await dbo.collection("auth").findOne()

            item1.token = token;

            try {

                let result = await dbo.collection("auth").update(dbo.collection("auth").findOne(), item1)
                    //console.log(result)
                if (result) {
                    resolve(true);
                }

            } catch (err) {
                console.log("Erro durante atualização no banco, verifique conexão" + err.stack)
                reject(false);

            }

        })

    });

};

exports.Auth = new Auth();