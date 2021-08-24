const {User} = require('../models/user');

module.exports.isAuthenticatedUser = async (req, res) => {
    const email = req.query.email;
    const user = await User.findOne({
        email
    }).exec();

    return (user === null) ? res.status(404).send() : res.send();
};

module.exports.authenticateUser = async (req, res) => {
    const email = req.body.email;
    const user = await User.findOne({
        email
    }).exec();

    if (user === null) {
        const user = new User({
            email: email,
            chats: []
        });
        try {
            await user.save();
        } catch (err) {
            console.error(err)
            res.status(500).send();
        }
    }

    res.send();
};