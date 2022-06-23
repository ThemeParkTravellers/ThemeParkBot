const {
    model,
    Schema
} = require('mongoose');

module.exports = model('DLPDB', new Schema({
    id: String,
    contentType: String,
    name: String,
    status: String,
    land: String,
    singleRider: Boolean,
    waitTime: String,
    singleRiderWaitTime: String
}));