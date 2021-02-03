const sequelize = require('sequelize');
const connection = require('./database');


//model
const Pergunta = connection.define('perguntas',{
    
    titulo:{
        type: sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: sequelize.TEXT,
        allowNull: false
    }
});

//Não força a criação da tabela mesmo se ela existir, não recria a tabela
Pergunta.sync({force: false}).then(() =>{});

module.exports = Pergunta;