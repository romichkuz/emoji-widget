const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
});


app.get('/get_emojies', (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
	res.setHeader('Access-Control-Allow-Credentials', true); // If needed
	console.log(req.query);

	res.send("New");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});