
let clientes = [];

const CONFIG = {
    usuario: "SEU_USUARIO_GITHUB",
    repositorio: "Transportadora",
    arquivo: "clientes.json",
    token: "COLOQUE_SEU_TOKEN"
};

async function carregarClientes(){

try{
let resposta = await fetch("clientes.json");
clientes = await resposta.json();
listarClientes();
}catch(e){
clientes=[];
}

}

function salvarCliente(){

let novo = {
id: Date.now(),
cliente: document.getElementById("cliente").value,
telefone: document.getElementById("telefone").value,
cidade: document.getElementById("cidade").value,
estado: document.getElementById("estado").value
};

clientes.push(novo);

listarClientes();

alert("Cliente adicionado. Próxima etapa enviaremos para GitHub API.");
}


function listarClientes(){

let tabela=document.getElementById("lista");
tabela.innerHTML="";

clientes.forEach(c=>{
tabela.innerHTML += `
<tr>
<td>${c.cliente}</td>
<td>${c.telefone}</td>
<td>${c.cidade}</td>
<td>${c.estado}</td>
</tr>`;
});

}

carregarClientes();
