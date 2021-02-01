var nome = "Minha calculadora c/ Require"

function soma(a, b){
    return a + b;
}

function subtracao(a, b){
    return a - b;
}

function multiplicacao(a,b){
    return a * b;
}

function divisao(a, b){
    return a / b;
}

module.exports = 
{nome,
soma, 
subtracao, 
multiplicacao, 
divisao}