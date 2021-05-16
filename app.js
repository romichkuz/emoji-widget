const express = require('express');
const app = express();
const port = 3000;
const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://mongo:mongo@emojisdb.6iax4.mongodb.net/emojisdb?retryWrites=true&w=majority";
const mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const fs = require('fs');
let dbClient;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

mongoClient.connect(function(err, client){
    if(err) return console.log(err);
    let collection = client.db("emojisdb").collection("emojis");
    collection.find({}, (err, res) => {
    	res.toArray().then((res) => {
    		console.log(res);
    	});
    });

    app.listen(port, function(){
        console.log("Сервер ожидает подключения...");
    });
});

app.get('/get_emojies', (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
	res.setHeader('Access-Control-Allow-Credentials', true); // If needed
	console.log(req.query);

	res.send("New");
});




function loadEmojiesToDB(collection){
	let emojis = [];
	try {
	  const data = fs.readFileSync('emojis.json', 'utf8');
	  let jsonData = JSON.parse(data);
	  emojis = jsonData['emojis'];
	} catch (err) {
	  console.error(err)
	}

	collection.insertMany(emojis);
}