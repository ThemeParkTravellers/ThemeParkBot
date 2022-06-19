const Themeparks = require("themeparks");
Themeparks.Settings.Cache = __dirname + "/themeparks.db";

const DisneylandParisMagicKingdom = new Themeparks.Parks.DisneylandParisMagicKingdom();
const DisneylandParisWaltDisneyStudios = new Themeparks.Parks.DisneylandParisWaltDisneyStudios();

module.exports = {
    DisneylandParisMagicKingdom,
    DisneylandParisWaltDisneyStudios
};
