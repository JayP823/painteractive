const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 2121;

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.listen(port, function(){
    console.log("Server listening on port " + port);
});

app.use('/user', require('./routes/user.router'));

app.get('/', function(req, res){
    res.send("Hello world!");
});

