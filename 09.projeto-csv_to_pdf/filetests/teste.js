const fs = require("fs");

fs.readFile("./levy.anselmo", 'UTF-8' ,(error, data) => {

    if(error) {
        console.log("ocorreu um erro na leitura")
    }else {
        console.log(data);
    }
})

fs. writeFile("./levy.anselmo", "Mussum reinis", (error) => {
    if(error){
        console.log("ocorreu um erro na escrita")
    }
})