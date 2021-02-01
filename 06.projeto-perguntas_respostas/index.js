const express = require("express");
const app = express();

//Informando ao Express que estamos usando o EJS como View Engine
app.set('view engine', 'ejs');
app.use(express.static('public'))

app.get("/:nome/:lang", (req, res) => {
    var nome = req.params.nome;
    var lang = req.params.lang;
    var exibirMsg = false;

    var produtos = [
        {nome: "Xilito", preco: 0.75},
        {nome: "Suco", preco: 0.75},
        {nome: "Dindin", preco: 2},
        {nome: "Saguadim", preco: 1},
        {nome: "Babalu", preco: 0.25},
        {nome: "Toddy", preco: 0.80}
        
    ]

    res.render("index.ejs", {
        nome: nome,
        lang: lang,
        empresa: "NoDevelopers",
        funcionarios: 1,
        msg: exibirMsg,
        produtos: produtos
    });
});

app.listen(8080, ()=>{console.log("App rodando");});