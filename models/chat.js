const mongoose = require('../utils/mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    messages: {
        type: [mongoose.ObjectId],
        default: [],
        required: true
    }
});

module.exports = {
    Chat: mongoose.model('Chat', schema),
    chatSchema: schema
};
