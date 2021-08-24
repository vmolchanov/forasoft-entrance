import {fetchAuthentication, fetchUserChats} from '../api/user';
import {setChats} from "../actions/user";

export const downloadChats = () => {
    return (dispatch) => {
        return fetchUserChats()
            .then((response) => response.json())
            .then((chats) => dispatch(setChats(chats)))
    };
};

export const authenticate = (email) => {
    return (dispatch) => {
        return fetchAuthentication(email);
    };
};