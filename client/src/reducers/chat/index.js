const initialState = {
    title: '',
    messages: [],
    currentMessage: ''
};

const Type = {
    ADD_MESSAGE: 'ADD_MESSAGE',
    CHANGE_CURRENT_MESSAGE: 'CHANGE_CURRENT_MESSAGE',
    ADD_TITLE: 'ADD_TITLE',
    ADD_MESSAGES: 'ADD_MESSAGES'
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
        case Type.ADD_TITLE:
            return {
                ...state,
                title: action.payload
            };
        case Type.ADD_MESSAGES:
            return {
                ...state,
                messages: action.payload.slice()
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

export const addTitle = (title) => {
    return {
        type: Type.ADD_TITLE,
        payload: title
    };
};

export const addMessages = (messages) => {
    return {
        type: Type.ADD_MESSAGES,
        payload: messages
    };
};

export const downloadMessages = (id) => {
    return (dispatch) => {
        return fetch(`/chat/${id}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                dispatch(addTitle(data.title));
                dispatch(addMessages(data.messages));
            });
    };
};

export default reducer;
