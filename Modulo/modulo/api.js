const API_URL = "https://6a7a59028c69b3eb4a172863.mockapi.io/clientes";

export async function getClientes() {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Falha ao buscar clientes");
    return await response.json();
}

export async function createCliente(client){
    const response = await fetch(API_URL, {
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(client)
    });
    if (!response.ok) throw new Error("Erro ao criar cliente");
    return response;
} 

export async function removeCliente(id) {
    const response = await fetch(`${API_URL}/${id}`,{
        method: "DELETE"
    });   
    if (!response.ok) throw new Error("Erro ao excluir cliente");
}