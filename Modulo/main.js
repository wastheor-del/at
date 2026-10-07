import { getClientes, createCliente, removeCliente } from "./modulo/api.js";
import { renderClientes, renderStats } from "./modulo/ui.js";

const clForm = document.getElementById("clForm");
const clList = document.getElementById("cliList");
const statsDiv = document.getElementById("stats");

let stateClientes = [];

async function loadClientes() {
    try {
        stateClientes = await getClientes();
        renderClientes(stateClientes, clList);
        renderStats(stateClientes, statsDiv);
    } catch(error){
        clList.innerHTML = `<p style="color:red; text-align:center;">Erro: Verifique a URL do crud</p>`;
        console.error(error);
    }
}

clForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("name").value;
    const emailInput = document.getElementById("email").value;

    const emailJaExiste = stateClientes.find(client => client.email === emailInput);

    if (emailJaExiste){
        alert("Este email já está cadastrado");
        return;
    }

    const newClient = {
        name: nameInput,
        email: emailInput
    };

    const submitBtn = clForm.querySelector("button");
    submitBtn.textContent = "Salvando...";

    try{
        await createCliente(newClient);
        clForm.reset();
        loadClientes();
    } catch (error) {
        console.error("Erro ao cadastrar:", error);
        alert("Erro ao cadastrar cliente");
    } finally {
        submitBtn.textContent = "Cadastrar";
    }
});

clList.addEventListener("click", async (e) => {

    if (e.target.clList.contains("delete-btn")){
        const id=e.target.getAttribute("data-id");

        const clienteDeletado= stateClientes.find(client => client._id === id);

        const confirmMessage = clienteDeletado
            ? `Tem certeza que deseja excluir o cliente ${clienteDeletado.name}?`
            : `Tem certeza que deseja excluir este cliente?`;

        if (!confirm(confirmMessage)) return;

        try{
            await removeCliente(id);
            loadClientes();
        } catch(error){
            console.error("Erro ao excluir:", error);
            alert("Erro ao excluir cliente");
        }
    }

});

loadClientes();