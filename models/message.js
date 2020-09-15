const mongoose = require('../utils/mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true
    }
});

module.exports = {
    Message: mongoose.model('Message', schema),
    messageSchema: schema
};
