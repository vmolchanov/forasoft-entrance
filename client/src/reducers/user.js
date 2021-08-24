import Cookies from 'js-cookie';
import {Reducer} from "../common/reducer";

const reducer = new Reducer({
    initialState: {
        name: Cookies.get('name') || null,
        email: Cookies.get('email') || null,
        chats: []
    },
    actions: {
        SET_NAME: (state, data) => {
            Cookies.set('name', data);
            return {
                ...state,
                name: data
            };
        },
        SET_EMAIL: (state, data) => {
            Cookies.set('email', data);
            return {
                ...state,
                email: data
            };
        },
        SET_CHATS: (state, data) => {
            data.forEach((a) => {
                a.id = a._id;
                delete a._id;
            });
            return {
                ...state,
                chats: data.slice()
            };
        }
    }
});

export default reducer.processAction();
