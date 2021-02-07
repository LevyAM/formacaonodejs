function enviarEmail(corpo, para, callback){
    setTimeout(() => {
        console.log(`
        Para: ${para}
        
        Mensagem: ${corpo}
        `);

        deuErro = true;

        if(deuErro){
            callback("O envio do email falhou");
        }else {
            callback();
        }

        
    }, 5000);
}

console.log("Enviando email");

enviarEmail("Este é o seu email", "exemplo@exemplo.com", (error) => {

    if(error == undefined){
        console.log("Favor confirmar email!");


    }else {
        console.log("Um erro ocorreu!")
    }

});



