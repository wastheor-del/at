export function renderClientes(clientes, listElement){
    if (clientes.length === 0) {
        listElement.innerHTML = `<p class="upDate">Nenhum cliente cadastrado</p>`;
        return;
    }

    const htmlString=clientes.map(client => `
        <li class="client-item">
            <div>
                <strong>${client.name}</strong> <br>
                <small>${client.email}</small>
            </div>
            <button class="delete-btn" data-id="${client._id}">Excluir</button>
        `).join("");

        listElement.innerHTML = htmlString;
}

export function renderStats(clientes, statsElement){
    if (clientes.length === 0){
        statsElement.innerHTML = "";
        return;
    }

    const totalClients = clientes.reduce((acumulador, clienteAtual) => acumulador + 1, 0);

    statsElement.innerHTML = `<p style="color:#666;">Total de clientes registrados: <strong>${totalClients}</strong></p>`;
}