require('dotenv').config();

const pgp = require('pg-promise')({
    //logs sql query to console
    query:(e) => console.log(e.query)
});

const db = pgp({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

console.log("thing just happened")

module.exports = db;