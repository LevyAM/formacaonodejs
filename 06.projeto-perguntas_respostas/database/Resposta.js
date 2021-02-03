const sequelize = require('sequelize');
const connection = require('./database');


//model
const Resposta = connection.define('respostas',{
    
    corpo:{
        type: sequelize.TEXT,
        allowNull: false
    },
    perguntaId:{
        type: sequelize.INTEGER,
        allowNull: false
    }
});

//Não força a criação da tabela mesmo se ela existir, não recria a tabela
Resposta.sync({force: false});

module.exports = Resposta;