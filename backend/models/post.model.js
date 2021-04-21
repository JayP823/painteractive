const { ObjectID } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    createdBy: {type: Schema.Types.ObjectId, ref: 'User'},
    createdDate: {type: Date, default: Date.now},
    description: {type: String},
    imageName: {type: String},
    image: {type: Schema.Types.Object, ref: 'File'}
});

schema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('Post', schema);