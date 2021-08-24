import {Reducer} from '../common/reducer';
import io from 'socket.io-client';
import {MessageType} from '../enums/message-type';

const reducer = new Reducer({
    initialState: {
        title: '',
        messages: [],
        currentMessage: '',
        // new
        socket: null
    },
    actions: {
        ADD_MESSAGE: (state, data) => {
            const messages = state.messages;
            messages.push(data);
            return {
                ...state,
                messages: messages.slice()
            };
        },
        CHANGE_CURRENT_MESSAGE: (state, data) => ({
            ...state,
            currentMessage: data
        }),
        ADD_TITLE: (state, data) => ({
            ...state,
            title: data
        }),
        ADD_MESSAGES: (state, data) => ({
            ...state,
            messages: data.slice()
        }),
        // new
        CONNECT_TO_CHAT: (state, data) => {
            const {id, onAddMessage, onLoadComponent} = data;
            const socket = io('http://localhost:3001');
            socket.emit('joinUser', id);
            socket.on('newMessage', (message) => {
                onAddMessage({
                    ...message,
                    type: MessageType.INCOMING
                });
            });
            onLoadComponent(id);
            return {
                ...state,
                socket
            };
        },
        DISCONNECT_CHAT: (state) => {
            const {socket} = state;
            socket.disconnect();
            return {
                ...state,
                socket
            };
        }
    }
});

export default reducer.processAction();
