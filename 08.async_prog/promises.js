function getId(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(5)
        }, 1500)
    }
)}

function buscarEmail(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("levy@2exemplo.com")
        }, 2500)
    }
)}


function enviarEmail(corpo, destinatario){
    return new Promise((resolve, reject) =>{
        console.log("Enviando email!")
        setTimeout(() =>{

            var deuErro = false;
            if(!deuErro){
                resolve({time: 3, to: "levy@exemplo.com"});
            }else {
                reject("Falha ao enviar email! =C");
            }

        }, 3000)
    })
}

getId().then((id) => {
    buscarEmail().then((email) => {
        enviarEmail("Olá, como vai?", email).then(()=>{
            console.log("Email enviado para o usuario com id: " +id)
        }).catch(() => {
            console.log(err)
        })
    })
})




// enviarEmail("Ola promisses", "eu@exemplo.com").then(({time, to}) => {
//     console.log(`
//         Email enviado!
//         Tempo: ${time};
//         To: ${to}
//         `
//     );
// }).catch((error) => {
//     console.log(error)
// })