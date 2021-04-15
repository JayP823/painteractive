const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')

const jwt = require('./_helpers/jwt');

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 2121;

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(jwt());


app.listen(port, function(){
    console.log("Server listening on port " + port);
});

app.use('/user', require('./routes/user.router'));
app.use('/post', require('./routes/post.router'));

app.get('/', function(req, res){
    var func = require('./_helpers/database').then(function(gfsConn){
        gfsConn.gfs.files.find().toArray((err, file) =>{
        if(!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            });
        }
        let fileNames = [];
        for(let i = 0; i < file.length; i++){
            fileNames.push(file[i].filename)
        }
        return res.json(fileNames);
        });
    });
});

app.get('/:id', function(req, res){
    var func = require('./_helpers/database').then(function(gfsConn){
        gfsConn.gfs.files.findOne({filename: req.params.id}, (err, file) =>{
        if (!file || file.length === 0) {
            res.render('index', { file: false });
        } else {
            const readstream = gfsConn.gfs.createReadStream(file.filename);
        readstream.pipe(res);
        }
        });
    });
})

