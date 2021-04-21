const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({}, {strict: false});

schema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('File', schema, "uploads.files");