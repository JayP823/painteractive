const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
        username: { type: String, unique: true, required: true },
        email: { type: String, unique: true, required: true },
        hash: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        headerPic: {type: String},
        profilePic: {type: String},
        bio: {type: String},
        following: [{type: Schema.Types.ObjectId, ref: 'User'}],
        followers: [{type: Schema.Types.ObjectId, ref: 'User'}],
        gallery: [{type: Schema.Types.ObjectId, ref: 'Post'}],
        createdDate: { type: Date, default: Date.now }
    }
);

schema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('User', schema);