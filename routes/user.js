const express = require('express');
const {authenticateUser, isAuthenticatedUser} = require('../controllers/user');
const router = express.Router();

router.get('/auth', isAuthenticatedUser);

router.post('/auth', authenticateUser);

module.exports = router;
