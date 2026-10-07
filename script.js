//poo

//class conta bancaria 

class contaBancaria {
    #saldo; // ou _saldo
    constructor(){
        this.#saldo = 0;
    }

    //metodos
    deposito(valor){
        if(valor > 0){
            this.#saldo += valor;
        }
    }

    sacar(valor){
        if(this.temSaldo(valor) && valor > 0){
            this.#saldo -= valor;
            return true;
        }
        return false;
        
    }

    temSaldo(valor){
        return valor <= this.#saldo;
    }

    get saldo(){
        return this.#saldo;
    }
}


class caixaEletronica{
    constructor(conta) {
        this.conta = conta
        
    }

    deposito() {
        const input = document.getElementById("valorDeposito");
        const valor = parseFloat(input.value);

        if (!isNaN(valor) && valor > 0) {
             this.conta.deposito(valor);
             this.mostrarSaldo(this.conta.saldo);
             input.value = "";
        }
        else {
            alert("Insira um valor válido para depósito.");
        }
    }

    sacar() {
        const input = document.getElementById("valorSaque");
        const valor = parseFloat(input.value);

        if (!isNaN(valor) && valor > 0) {
            if (this.conta.sacar(valor)) {
                this.mostrarSaldo(this.conta.saldo);
                input.value = "";
            } else {
                alert("Saldo insuficiente ou valor indisponível.");
            }
        } else {
            alert ("Insira um valor válido para saque.");
        }

    }

    mostrarSaldo(saldo){
        const saldoFormatado = saldo.toLocaleString('pt-BR', {minimumFractionDigits:2, maximumFractionDigits: 2});
        document.getElementById("saldo").textContent = `Saldo: R$ ${saldoFormatado}`;
    }

}

const minhaConta = new contaBancaria();
const caixa = new caixaEletronica(minhaConta);