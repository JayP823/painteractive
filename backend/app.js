const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const http = require('http')
const mongoose = require('mongoose');


const jwt = require('./_helpers/jwt');

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 2121;

app.use(cors());
app.use(bodyParser.urlencoded({extended: false, limit: '1mb'}));
app.use(bodyParser.json({limit: '1mb'}));


app.set('view engine', 'ejs');

app.use(jwt());


app.listen(port, function(){
    console.log("Server listening on port " + port);
});

app.use('/user', require('./routes/user.router'));
app.use('/post', require('./routes/post.router'));


//TEMP FRONTEND INTERFACE
app.get('/', async function(req, res){
    let func = require('./_helpers/database');
    let gfs, Post;
    await func.then((gfsConn) => {
        gfs = gfsConn.gfs;
        Post = gfsConn.Post;
    });
    let ret = [];
    var func2 = new Promise((resolve, reject) => {
        http.get(`http://localhost:2121/post/all`, (resp) => {
            resp.on('data', (posts) => {ret = JSON.parse(posts); resolve();});
        })
    })    
    func2.then(()=>{
        res.render('index', {files: ret});
    })
});

app.get('/login', (req, res) => {
    res.render('login')
})

process.on('SIGINT', function() {
    mongoose.connection.close(function(){
        console.log("app interrupted (ctrl + c)");
        process.exit(0);
    });
})

process.on('SIGTERM', function() {
    mongoose.connection.close(function(){
        console.log("app terminated");
        process.exit(0);
    });
})