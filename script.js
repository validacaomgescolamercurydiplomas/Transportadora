
let clientes = JSON.parse(localStorage.getItem('clientes')) || [];

function salvarCliente(){
let cliente=document.getElementById('cliente').value;
let telefone=document.getElementById('telefone').value;
let cidade=document.getElementById('cidade').value;
let estado=document.getElementById('estado').value;

if(!cliente || !estado){
alert('Preencha cliente e estado');
return;
}

clientes.push({cliente,telefone,cidade,estado});
localStorage.setItem('clientes',JSON.stringify(clientes));
limpar();
listarClientes();
}

function listarClientes(){
let tabela=document.getElementById('listaClientes');
tabela.innerHTML='';

clientes.forEach((c,i)=>{
tabela.innerHTML += `<tr>
<td>${c.cliente}</td>
<td>${c.telefone}</td>
<td>${c.cidade}</td>
<td>${c.estado}</td>
<td><button onclick="excluirCliente(${i})">Excluir</button></td>
</tr>`;
});
}

function excluirCliente(i){
clientes.splice(i,1);
localStorage.setItem('clientes',JSON.stringify(clientes));
listarClientes();
}

function limpar(){
cliente.value='';
telefone.value='';
cidade.value='';
estado.value='';
}

listarClientes();
