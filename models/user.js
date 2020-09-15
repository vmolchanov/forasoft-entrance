const mongoose = require('../utils/mongoose');
const {chatSchema} = require('./chat');

const Schema = mongoose.Schema;

const schema = new Schema({
    email: {
        type: String,
        required: true
    },
    chats: {
        type: [mongoose.ObjectId],
        required: true
    }
});

module.exports = {
    User: mongoose.model('User', schema),
    userSchema: schema
};
