const express = require('express');
const mongoose = require('../utils/mongoose');
const router = express.Router();
const User = require('../models/user').User;
const Chat = require('../models/chat').Chat;

router.get('/all', async (req, res) => {
    const email = req.cookies.email;
    const user = await User.findOne({
        email
    });
    const chats = await Chat.find({_id: {$in: user.chats}});

    return res.json(chats);
});

router.post('/create', async (req, res) => {
    const email = req.cookies.email;
    const title = req.body.title;
    const chat = new Chat({
        title
    });

    // Сохранение чата
    try {
        await chat.save();
    } catch (err) {
        console.error(err)
        return res.status(500).send();
    }

    // Поиск пользователя по email и добавление ему нового чата
    try {
        await User.updateOne({
            email
        }, {
            $push: {
                chats: chat._id
            }
        });
    } catch(err) {
        console.error(err);
        return res.status(500).send();
    }

    return res.json({
        id: chat._id
    });
});

router.get('/join', async (req, res) => {
    const {id} = req.query;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).send();
    }
    const chat = await Chat.findById(id);
    return chat === null ? res.status(404).send() : res.json({id: chat._id});
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).send();
    }
    const chat = await Chat.findById(id);
    console.log('chat', chat);
    return res.json(chat);
});

module.exports = router;
