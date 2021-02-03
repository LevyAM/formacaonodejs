const express = require("express");
const app = express();

//para poder chamar os "names" dos componentes do front, no backend com req.body
const bodyParser = require("body-parser");

//dotenv para esconder variáveis/constantes no .env (usar .gitignore para não subir arquivo)
const dotenv = require('dotenv');
dotenv.config({path: './config/config.env'});
const PORT = process.env.MY_PORT;

//conexão com o banco usando mysql2
const connection = require("./database/database");

//cria model Pergunta na base de dados
const Pergunta = require('./database/Pergunta');
const Resposta = require('./database/Resposta');

connection.authenticate()
    .then(() => {
        console.log("Conexão feita com o bando de dados!");
    }).catch((msgErro) => {
        console.log("Conexão falhou com bando de dados!", msgErro);
    });

//Informando ao Express que estamos usando o EJS como View Engine
app.set('view engine', 'ejs');
app.use(express.static('public'))

//Body parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//Rotas
app.get("/", (req, res) => {
    Pergunta.findAll({raw:true, order: [
        ['id', 'DESC']
    ]})
    .then((perguntas) => {res.render("index.ejs", {perguntas:perguntas});}
    )
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar.ejs");
});

app.post("/salvarpergunta", (req,res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/")
    })
});

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: {id:id}
    }).then(pergunta => {
        if(pergunta != undefined){
            
            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [['id', 'DESC']]
            }).then(respostas => {
                res.render("pergunta.ejs", {
                    pergunta: pergunta,
                    respostas: respostas
                });
            });
        }else{
            res.redirect("/")
        }
    })
});

app.post("/responder", (req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/"+perguntaId)
    })
})

app.listen(PORT, ()=>{console.log("App rodando");});