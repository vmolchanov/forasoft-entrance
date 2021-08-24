export const addMessage = (message) => ({
    type: 'ADD_MESSAGE',
    payload: message
});

export const changeCurrentMessage = (newMessage) => ({
    type: 'CHANGE_CURRENT_MESSAGE',
    payload: newMessage
});

export const addTitle = (title) => ({
    type: 'ADD_TITLE',
    payload: title
});

export const addMessages = (messages) => ({
    type: 'ADD_MESSAGES',
    payload: messages
});

export const connectToChat = (id, onAddMessage, onLoadComponent) => ({
    type: 'CONNECT_TO_CHAT',
    payload: {
        id,
        onAddMessage,
        onLoadComponent
    }
});

export const disconnectChat = () => ({
    type: 'DISCONNECT_CHAT'
});