const Sequelize = require("sequelize");


const connection = new Sequelize('banco_de_games', process.env.BD_USERNAME , process.env.BD_PASSWORD, {
    host: process.env.BD_HOSTNAME,
    dialect: 'mysql',
    logging: false
});

module.exports = connection;


