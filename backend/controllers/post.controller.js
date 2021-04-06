const postService = require('../services/post.service');
const Jimp = require('jimp');


module.exports = {
    createPost
}

function createPost(req, res, next){
    //postService.upload(req.body)
    //.then(() => res.json({}));


    /** 
    const assert = require('assert');
    const fs = require('fs');
    const mongodb = require('mongodb');
    
    const uri = 'mongodb://localhost:27017';
    const dbName = 'painteractive';
    
    mongodb.MongoClient.connect(uri, function(error, client) {
      assert.ifError(error);
    
      const db = client.db(dbName);
    
      var bucket = new mongodb.GridFSBucket(db);
    
        bucket.openUploadStream(req.body).
        on('error', function(error) {
          assert.ifError(error);
        }).
        on('finish', function() {
          console.log('done!');
          process.exit(0);
        });
    });
*/

     
    const image = req.body;
    try{
        Jimp.read(image, (err, input) => {
            if (err) throw err;

            input.getBuffer(Jimp.AUTO, (err, output) => {
                if(err) throw err;
                res.writeHead(200, {'Content-Type': 'image/png'});
                return res.end(output, 'binary');
            });
        });
    } catch (err){
        return res.status(400).send(`Error: ${err.message}`).end();
    }
 
}