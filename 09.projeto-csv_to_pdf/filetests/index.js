const fs = require("fs");

modificarUsuario("Levy Anselmo", "SpringBoot", "Udemy2")

function modificarUsuario(nome, curso, plataforma){
    
    fs.readFile("./usuario.json", {encoding: 'utf-8'}, (error, data) =>{
        if(error){
            console.log("Um erro na leitura")
        } else {
            var conteudo = JSON.parse(data);
    
            conteudo.nome = nome
            conteudo.curso = curso
            conteudo.plataforma = plataforma
    
            fs.writeFile("./usuario.json", JSON.stringify(conteudo), (erro) => {
                if(erro){
                    console.log("ocorreu um erro na escrita")
                }
            })
            console.log(conteudo)
        }
    })


}