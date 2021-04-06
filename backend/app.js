const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 2121;

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(bodyParser.raw({
    type: 'image/png',
    limit: '50mb'
}));

app.listen(port, function(){
    console.log("Server listening on port " + port);
});

app.use('/user', require('./routes/user.router'));
app.use('/post', require('./routes/post.router'));

app.get('/', function(req, res){
    res.send("Hello world!");
});

