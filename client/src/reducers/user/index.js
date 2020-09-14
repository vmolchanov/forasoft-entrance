import Cookies from 'js-cookie';

const Type = {
    SET_NAME: 'SET_NAME',
    SET_EMAIL: 'SET_EMAIL',
    SET_CHATS: 'SET_CHATS'
};

const initialState = {
    name: Cookies.get('name') || null,
    email: Cookies.get('email') || null,
    chats: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Type.SET_NAME:
            Cookies.set('name', action.payload);
            return {
                ...state,
                name: action.payload
            };
        case Type.SET_EMAIL:
            Cookies.set('email', action.payload);
            return {
                ...state,
                email: action.payload
            };
        case Type.SET_CHATS:
            return {
                ...state,
                chats: action.payload
            };
        default:
            return state;
    }
};

export const setName = (name) => {
    return {
        type: Type.SET_NAME,
        payload: name
    };
};

export const setEmail = (email) => {
    return {
        type: Type.SET_EMAIL,
        payload: email
    };
};

export const setChats = (chats) => {
    return {
        type: Type.SET_CHATS,
        payload: chats
    };
};

export const downloadChats = () => {
    return (dispatch) => {
        return fetch('chats')
            .then((response) => {
                return response.json();
            })
            .then((chats) => {
                dispatch(setChats(chats));
            })
    };
};

export default reducer;
