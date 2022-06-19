const {
    model,
    Schema
} = require('mongoose');

module.exports = model('OuDB', new Schema({
    GuildID: String,
    AnswerID: String,
    UserID: String,
    Time: String,
    Message: String
}));