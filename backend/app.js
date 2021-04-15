const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')

const jwt = require('./_helpers/jwt');

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 2121;

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.set('view engine', 'ejs');

app.use(jwt());


app.listen(port, function(){
    console.log("Server listening on port " + port);
});

app.use('/user', require('./routes/user.router'));
app.use('/post', require('./routes/post.router'));

app.get('/', async function(req, res){
    let func = require('./_helpers/database');
    let gfs;
    await func.then((gfsConn) => {
        gfs = gfsConn.gfs;
    });

    await gfs.files.find().toArray((err, file) =>{
        if(!file || file.length === 0) {
            res.render('index', {files: false});
        } else {
            file.map(files => {
              if (
                files.contentType === 'image/jpeg' ||
                files.contentType === 'image/png' ||
                files.contentType === 'image/gif'
              ) {
                files.isImage = true;
              } else {
                files.isImage = false;
              }
            });
        }
        let fileNames = [];
        for(let i = 0; i < file.length; i++){
            fileNames.push(file[i].filename)
        }
        res.render('index', {files: file});
    });
});

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/:id', async function(req, res){
    let func = require('./_helpers/database');
    let gfs;
    await func.then((gfsConn) => {
        gfs = gfsConn.gfs;
    })

    gfs.files.findOne({filename: req.params.id}, (err, file) =>{
        if (!file || file.length === 0) {
            res.render('index', { file: false });
        } else {
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        }
    });
})

