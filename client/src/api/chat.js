import {postRequest} from '../common/api';

export const fetchMessages = (id) => {
    return fetch(`/chat/${id}`);
}

export const fetchCreateChat = (title) => {
    return postRequest('/chat/create', {title});
};