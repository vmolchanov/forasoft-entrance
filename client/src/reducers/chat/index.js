const initialState = {
    messages: [],
    currentMessage: ''
};

const Type = {
    ADD_MESSAGE: 'ADD_MESSAGE',
    CHANGE_CURRENT_MESSAGE: 'CHANGE_CURRENT_MESSAGE'
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Type.ADD_MESSAGE:
            const messages = state.messages;
            messages.push(action.payload);
            return {
                ...state,
                messages: messages.slice()
            };
        case Type.CHANGE_CURRENT_MESSAGE:
            return {
                ...state,
                currentMessage: action.payload
            };
        default:
            return state;
    }
};

export const addMessage = (message) => {
    return {
        type: Type.ADD_MESSAGE,
        payload: message
    };
};

export const changeCurrentMessage = (newMessage) => {
    return {
        type: Type.CHANGE_CURRENT_MESSAGE,
        payload: newMessage
    };
};

export default reducer;
