
let clientes = JSON.parse(localStorage.getItem('clientes')) || [];

function salvarCliente(){

let cliente = document.getElementById('cliente').value;
let telefone = document.getElementById('telefone').value;
let cidade = document.getElementById('cidade').value;
let estado = document.getElementById('estado').value;

if(!cliente){
alert('Informe o nome do cliente');
return;
}

clientes.push({
cliente,
telefone,
cidade,
estado
});

localStorage.setItem('clientes', JSON.stringify(clientes));

limpar();
listarClientes();

}

function listarClientes(){

let tabela=document.getElementById('listaClientes');

tabela.innerHTML='';

clientes.forEach((c,index)=>{

tabela.innerHTML += `
<tr>
<td>${c.cliente}</td>
<td>${c.telefone}</td>
<td>${c.cidade}</td>
<td>${c.estado}</td>
<td>
<button onclick="excluirCliente(${index})">Excluir</button>
</td>
</tr>
`;

});

}

function excluirCliente(index){

clientes.splice(index,1);

localStorage.setItem('clientes',JSON.stringify(clientes));

listarClientes();

}

function limpar(){

document.getElementById('cliente').value='';
document.getElementById('telefone').value='';
document.getElementById('cidade').value='';
document.getElementById('estado').value='';

}

listarClientes();
