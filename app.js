const express = require('express');
const app = express();
const port = 3000;
const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://mongo:mongo@emojisdb.6iax4.mongodb.net/emojisdb?retryWrites=true&w=majority";
const mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const fs = require('fs');
let dbClient;
let collection;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

mongoClient.connect(function(err, client){
    if(err) return console.log(err);
    dbClient = client.db("emojisdb");
    collection = client.db("emojisdb").collection("emojis");

    collection.find({ $text: { $search: "clown" }}, (err, res) => {
    	res.toArray().then((res) => {
    		console.log(res);
    	});
    });



    app.listen(port, function(){
        console.log("Сервер ожидает подключения...");
    });
});

// 36
app.get('/get_emojies', (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
	res.setHeader('Access-Control-Allow-Credentials', true); // If needed

	if (req.query.category) {
	    collection
	    	.find( {category: parseInt(req.query.category)} )
	    	.sort( {_id: 1} )
	    	.skip( parseInt(req.query.offset) )
	    	.limit( parseInt(req.query.limit) )
	    	.toArray()
	    	.then(emojies => {
	    		res.send(emojies);
	    	});
	} else {
		collection.find({ $text: { $search: req.query.q }}, (err, resEmojies) => {
	    	resEmojies.toArray().then((emojies) => {
	    		res.send(emojies);
	    	});
	    });	
	}
});



function initEmojisDB(db){
	db.collection('emojis').createIndex( {name: "text", description: "text"} );
}

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