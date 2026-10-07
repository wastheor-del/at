const API_URL = "https://crudcrud.com/api/72cede4084b14ced8187e7fb2a4ec2b8/clientes";

const clForm = document.getElementById("clForm");
const clList = document.getElementById("cliList");

async function fetchClientes() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Falha ao buscar clientes");

        const clientes = await response.json();
        renderClientes(clientes);
    }
    catch(error) {
        clList.innerHTML = `<p style="color:red; text-align:center;">Erro: Verifique a URL do CrudCrud.</p>`;
        console.error(error);
    }
}

function renderClientes(clientes) {
    clList.innerHTML = "";

    if (clientes.length === 0) {
        clList.innerHTML = `<p class="upDate">Nenhum cliente cadastrado</p>`;
        return;
    }

    clientes.forEach(client => {
        const li = document.createElement("li");
        li.className = "cliente-item";
        li.innerHTML = `
            <div>
                <strong> ${client.name}</strong> <br>
                <small> ${client.email}</small>
            </div>
            <button class="delete-btn" onclick="deleteClient('${client._id}')">Excluir</button>
        `;
        clList.appendChild(li);
    });
}

clForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const newClient = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value
    };

    const submitBtn = clForm.querySelector("button");
    submitBtn.textContent = "Salvando...";

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(newClient)
        });
        
        if (response.ok) {
            clForm.reset();
            fetchClientes();
        }
    } 
    catch (error){
        console.error("Erro ao cadastrar:", error);
        alert("Erro ao cadastrar cliente.");
    }
    finally{
        submitBtn.textContent = "Cadastrar";
    }

});

window.deleteClient = async function(id) {
    if (!confirm("Tem certeza que deseja excluir este cliente?")) return;

    try{
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (response.ok){
            fetchClientes();
        }
    }
    catch(error){
        console.error("Erro ao excluir:", error);
        alert("Erro ao excluir cliente.");
    }
    
}

fetchClientes();