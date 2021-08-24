import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import reducer from './reducers';
import thunk from 'redux-thunk';

const getApplicationMarkup = (store) => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};

const extension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : n => n;
const store = createStore(reducer, compose(applyMiddleware(thunk), extension));

ReactDOM.render(getApplicationMarkup(store), document.getElementById('root'));