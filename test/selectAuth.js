var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("teste");
    dbo.collection("auth").findOne({}, function(err, result) {
        if (err) throw err;
        console.log(result.name + " " + result.address);
        db.close();
    });
});