import {combineReducers} from 'redux';
import user from './user.js';
import chat from './chat.js';

export default combineReducers({
    user,
    chat
});