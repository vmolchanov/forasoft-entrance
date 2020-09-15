const mongoose = require('mongoose');
const config = require('../config');

mongoose.connection = mongoose.connect(config.db.uri, {
    useNewUrlParser: config.db.options.useNewUrlParser,
    useUnifiedTopology: config.db.options.useUnifiedTopology
});
mongoose.Promise = global.Promise;

module.exports = mongoose;