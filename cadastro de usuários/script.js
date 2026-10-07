const form = document.getElementById("usInf");
const input = form.querySelectorAll("input");
const cepInput = document.getElementById("cep");

function salveDados(){
    const formaData = {};
    input.forEach(input => {
        formaData[input.name] = input.value;
    });
    localStorage.setItem("dadosCadastro", JSON.stringify(formaData));
}

function carregarDados(){
    const dadosSalvo = localStorage.getItem("dadosCadastro");

    if (dadosSalvo) {
        const formaData = JSON.parse(dadosSalvo);
        input.forEach(input => {
            if (formaData[input.name]) {
                input.value = formaData[input.name];
            }
        });
    }
}

input.forEach(input => {
    input.addEventListener("input", salveDados)
});

window.addEventListener("DOMContentLoaded", carregarDados);

cepInput.addEventListener("blur", async(event) => {
    const cep = event.target.value.replace(/\D/g, "");

    if(cep.length === 8){
        try {
            const response = await fetch (`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (data.erro){
                alert("CEP não encontrado.");
            }

            document.getElementById("logradouro").value = data.logradouro;
            document.getElementById("bairro").value = data.bairro;
            document.getElementById("cidade").value = data.localidade;
            document.getElementById("estado").value = data.uf;

            salveDados();
            
        }
        catch (erro) {
            console.error("Erro na busca do CEP:", erro);
            alert("Não foi possível consultar o CEP.");
        }
    }

});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    console.log("Formulario enviado com sucesso.");

    localStorage.removeItem("dadosCadastro");

    form.reset();

    alert("Cadastro realizado com sucesso.")

});