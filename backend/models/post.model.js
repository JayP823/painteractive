const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    createdBy: {type: Schema.Types.ObjectId, ref: 'User'},
    description: {type: String},
    image: {type: Schema.Types.ObjectId}
});

schema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('Post', schema);