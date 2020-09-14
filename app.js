// var createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/chats', (req, res) => {
    res.json([
        {
            name: 'гыгы',
            id: 283765
        },
        {
            name: 'Други',
            id: 94375867
        },
        {
            name: '168',
            id: 43867
        },
        {
            name: 'АЗАЗА',
            id: 948556
        }
    ]);
});

app.post('/create', (req, res) => {

});

app.get('/join', (req, res) => {
    
});

module.exports = app;
