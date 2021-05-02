const dotenv = require('dotenv').config();

module.exports = {
    "secret": "bumbumbumbumbumbumbumbumbumbum",
    "connectionString": `mongodb+srv://${process.env.DBUSER}:${process.env.PASSWORD}@painteractive.t8slq.mongodb.net/painteractive?retryWrites=true&w=majority`
}