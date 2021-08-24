import {postRequest} from "../common/api";

export const fetchUserChats = () => {
    return fetch('/chat/all');
};

export const fetchAuthentication = (email) => {
    return postRequest('/user/auth', {email})
};