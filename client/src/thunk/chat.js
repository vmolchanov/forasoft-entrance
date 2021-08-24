import {addMessages, addTitle} from '../actions/chat';
import {fetchCreateChat, fetchMessages} from '../api/chat';

export const downloadMessages = (id) => {
    return (dispatch) => {
        return fetchMessages(id)
            .then((response) => response.json())
            .then((data) => {
                dispatch(addTitle(data.title));
                dispatch(addMessages(data.messages));
            });
    };
};

export const createChat = (title) => {
    return () => {
        return fetchCreateChat(title)
            .then((response) => response.json());
    };
};