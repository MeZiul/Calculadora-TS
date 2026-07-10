import Calculadora from "./calculadora";

const calculadora = new Calculadora();

const input = document.getElementById("input1") as HTMLInputElement;
const botoes = document.querySelectorAll("button");

let operacao: string = "";
let primeiroNumero: string = "";
let segundoNumero: string = "";
let resultado: number = 0;

botoes.forEach(botao => {

    botao.addEventListener("click", () => {
        const valor: string = botao.id;

        processarEntrada(valor)
    });
});

addEventListener("keydown", (event) => {
    processarEntrada(event.key)
})

function processarEntrada(tecla: string) {
    if (!isNaN(Number(tecla))) {
        if (operacao === "") {
            primeiroNumero += tecla;
            input.value = primeiroNumero;
        }
        else {
            segundoNumero += tecla;
            input.value = `${primeiroNumero} ${operacao} ${segundoNumero}`;
        }
    } else if (tecla === "+" || tecla === "-" || tecla === "*" || tecla === "/") {
        if (primeiroNumero == "") {
            if (tecla === "*" || tecla === "/")
                return
        }
        if (segundoNumero != "") {
            calcularResultado()
        }
        if (segundoNumero != "") return
        operacao = tecla;
        input.value = `${primeiroNumero} ${tecla} `;
    } else if (tecla === "Enter" || tecla === "=") {
        if (segundoNumero != "") calcularResultado();
        else input.value = "Adicionar segundo número"
    } else if (tecla === "Backspace") {
        apagar();
    } else if (tecla === "Escape") {
        limpar();
    } else if (tecla === ".") {
        if (operacao === "") {
            if (!primeiroNumero.includes(".")) primeiroNumero += ".";

            input.value = primeiroNumero;
        } else {
            if (!segundoNumero.includes(".")) segundoNumero += ".";

            input.value = `${primeiroNumero} ${operacao} ${segundoNumero}`;
        }

    }
    else if ( tecla === "ANS"){
        primeiroNumero = resultado.toString()
        input.value = primeiroNumero
    }
    else if (tecla.length === 1) input.value = "Comando não reconhecido"
}

function calcularResultado() {
    calculadora.setFirst(Number(primeiroNumero));
    calculadora.setSecond(Number(segundoNumero));
    calculadora.setOperator(operacao);

    try {
        resultado = calculadora.calculate();
        input.value = `${primeiroNumero} ${operacao} ${segundoNumero} = ${resultado}`;

        primeiroNumero = resultado.toString();
        segundoNumero = "";
        operacao = ""
    } catch (error) {
        if (error instanceof Error) input.value = error.message
        limpar()
    }
}

function limpar() {
    primeiroNumero = "";
    segundoNumero = "";
    operacao = "";
    resultado = 0;

    input.value = "";
}

function apagar() {
    if (segundoNumero !== "") segundoNumero = segundoNumero.slice(0, -1);
    else if (operacao !== "") operacao = "";
    else if (primeiroNumero != "") primeiroNumero = primeiroNumero.slice(0, -1);

    input.value = `${primeiroNumero} ${operacao} ${segundoNumero}`.trim();

}
