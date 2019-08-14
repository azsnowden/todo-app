require('dotenv').config();

const pgp = require('pg-promise')();

const db = pgp({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

console.log("thing just happened")

module.exports = db;