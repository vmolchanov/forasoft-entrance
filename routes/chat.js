const express = require('express');
const router = express.Router();
const {
    getAllUserChats,
    createChat,
    joinChat,
    getChatById
} = require('../controllers/chat');

router.get('/all', getAllUserChats);

router.post('/create', createChat);

router.get('/join', joinChat);

router.get('/:id', getChatById);

module.exports = router;
