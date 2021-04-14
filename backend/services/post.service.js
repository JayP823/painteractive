module.exports = {
    getPostInfo,
    showPost
}

function getPostInfo(req, res){
    var func = require('../_helpers/database').then(function(gfsConn){
        gfsConn.gfs.files.findOne({filename: req.params.id}, (err, file) =>{
        if(!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            });
        }
        return res.json(file);
        });
    });
}

function showPost(req, res){
    var func = require('../_helpers/database').then(function(gfsConn){
        gfsConn.gfs.files.findOne({filename: req.params.id}, (err, file) =>{
        if(!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            });
        }
        const readstream = gfsConn.gfs.createReadStream(file.filename);
        readstream.pipe(res);
        });
    });
}