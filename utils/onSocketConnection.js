const mongoose = require('./mongoose');
const Chat = require('../models/chat').Chat;
const Message = require('../models/message').Message;

const onSocketConnection = (socket) => {
    socket.on('joinUser', (id) => {
        socket.join(id);
    });

    socket.on('sendMessage', async (message) => {
        const messageSchema = new Message({
            name: message.name,
            email: message.email,
            body: message.body,
            time: message.time
        });

        try {
            await messageSchema.save();
        } catch(err) {
            console.error(err);
        }

        try {
            await Chat.updateOne({_id: mongoose.Types.ObjectId(message.id)}, {$push: {messages: messageSchema._id}});
        } catch(err) {
            console.error(err)
        }
        socket.to(message.id).broadcast.emit('newMessage', message);
    });
};

module.exports = onSocketConnection;
