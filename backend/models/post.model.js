const { ObjectID } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    createdBy: {type: Schema.Types.ObjectId, ref: 'User'},
    createdDate: {type: Date, default: Date.now},
    description: {type: String},
    postID: {type: String},
    image: {type: Schema.Types.Object, ref: 'File'},
    liked: [{type: Schema.Types.ObjectId, ref: 'User'}],
    reposted: [{type: Schema.Types.ObjectId, ref: 'User'}],
    tags: [{type: String}]
})

schema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('Post', schema);