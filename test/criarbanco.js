var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/teste";

MongoClient.connect(url, function(err, db) {
    if (err) {
        console.log("Atencao erro ao criar o banco\n Veja o log de erro abaixo!\n\n")    
        throw err;   
    }
    console.log("Database created!");
    db.close();
});