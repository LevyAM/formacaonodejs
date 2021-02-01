const express = require("express"); //Importando o express
const app = express(); //Iniciando o express

app.get("/", function(req, res){
    res.send("<h1>Bem vindo ao meu site</h1>");
});

app.get("/blog?/:artigo?", function(req, res){
    var artigo = req.params.artigo;

    if(artigo){
        res.send( "<h2>Artigo: " + artigo + "</h2>")
    }else {
        res.send("<h2>Favor inserir o artigo</h2>")
    }

    res.send("<h1>Meu blog</h1>")
})

app.get("/canal/youtube", function(req, res){
    var canal = req.query["canal"];
    //res.send("<h1>Meu canal do youtube</h1>")
    if(canal){
        res.send(canal);
    }else
        res.send("Nenhum canal fornecido");
})
app.get("/ola?/:nome/:empresa", function(req, res){
    //REQ => DADOS ENVIADOS PELO USUÁRIO
    //RES => DADOS QUE VÃO SER ENVIADOS PARA O USUÁRIO
    var nome = req.params.nome
    var empresa = req.params.empresa
    res.send("<h1>Oi! " + nome + " da empresa " + empresa + "</h1>");
})

app.listen(4000, function(erro){
    if(erro){
        console.log("Ocorreu um erro");
    } else{
        console.log("Servidor iniciado com sucesso")
    }
})