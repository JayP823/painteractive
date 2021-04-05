const express = require('express');
const app = express();
const cors = require('cors');

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 2121;

app.use(cors());

app.listen(port, function(){
    console.log("Server listening on port " + port);
});

app.get('/', function(req, res){
    res.send("Hello world!");
});