const express = require("express");
const app = express();

//Informando ao Express que estamos usando o EJS como View Engine
app.set('view engine', 'ejs');
app.use(express.static('public'))

app.get("/", (req, res) => {
       res.render("index.ejs");
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar.ejs");
})


app.listen(8080, ()=>{console.log("App rodando");});