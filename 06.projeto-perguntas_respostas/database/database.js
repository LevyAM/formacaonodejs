const sequelize = require('sequelize');
const connection = new sequelize('guia_perguntas', process.env.MY_USERNAME, process.env.MY_PASSWORD, {
    host: process.env.MY_HOST,
    dialect: 'mysql',
    logging: false
});

module.exports = connection;