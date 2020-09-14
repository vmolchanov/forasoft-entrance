const onSocketConnection = (socket) => {
    socket.on('joinUser', (id) => {
        socket.join(id);
    });

    socket.on('sendMessage', (message) => {
        socket.to(message.id).broadcast.emit('newMessage', message);
    });
};

module.exports = onSocketConnection;
