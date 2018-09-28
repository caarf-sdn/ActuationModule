var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";




MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("teste");

    var myobj = { name: "sdn", password: "skyline" , token:""};

    dbo.collection("auth").insertOne(myobj, function(err, res) {

        if (err) throw err;
        console.log("1 document inserted");
        db.close();

    });
});