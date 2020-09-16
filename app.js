const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser());

// routes
app.use(`/user`, require(`./routes/user`));
app.use(`/chat`, require(`./routes/chat`));

module.exports = app;
