let saldo = 0;
let minutos = 0;
let troco = 0;


function calTempo(valTotal) {
    if (valTotal < 1.00) {
        minutos = 0;
        troco  = 0;
    }
    else if (valTotal < 2.00){
        minutos = 30;
        troco  = 0;
    }
    else if (valTotal < 3.00){
        minutos = 60;
        troco  = 0;
    }
    else if (valTotal < 4.00){
        minutos = 90;
        troco  = 0;
    }
    else {
        minutos = 120;
        troco  = valTotal - 8.00;
    }


}

function colMoeda(valor) {
    saldo += valor;
    calTempo(saldo);
    atulizarTEla();
}

function digValor() {
    const input = document.getElementById("valInput");
    const valInput = parseFloat(input.value);
    

    if (isNaN(valInput) || valInput <= 0){
        alert("Por favor, digite um número válido.Obrigado");
        return;
    }

    saldo += valInput;
    calTempo(saldo);
    atulizarTEla();
    input.value = "";
}

function atulizarTEla() {
    document.getElementById("saldo").innerText = saldo.toFixed(2).replace(".",",");
    document.getElementById("tempo").innerText = minutos;
}

function pegar(){
    if (minutos === 0) {
        alert("Valor mínimo é R$ 1,00 (30 min).");
        return;
    }

    const fixa = document.getElementById("fixa");
    fixa.style.display = "block";

    const valPago = saldo - troco;
    
    let msg = `<b> Fixa Emitida</b><br>
    Tempo: ${minutos} minutos<br>
    Pego: R$ ${valPago.toFixed(2).replace(".", ",")}`;

    if (troco > 0){
        msg += `<br><b style="color: green;"> Troco: R${troco.toFixed(2).replace(".", ",")}</b>`
    }

    fixa.innerHTML = msg;

    saldo = 0;
    minutos = 0;
    troco = 0;
    atulizarTEla();

}