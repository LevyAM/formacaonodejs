const Sequelize = require('sequelize');
const connection = require('./database');

const Game = connection.define('games', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    year:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    price:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Game.sync({force: false}).then(() => {})

module.exports = Game;