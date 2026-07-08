
let clientes = JSON.parse(localStorage.getItem('clientes')) || [];

function mascaraTelefone(valor){
    valor = valor.replace(/\D/g,'').substring(0,11);

    if(valor.length <= 10){
        return valor
        .replace(/^(\d{2})(\d)/,'($1) $2')
        .replace(/(\d{4})(\d)/,'$1-$2');
    } else {
        return valor
        .replace(/^(\d{2})(\d)/,'($1) $2')
        .replace(/(\d{5})(\d)/,'$1-$2');
    }
}

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("telefone").addEventListener("input", function(){
        this.value = mascaraTelefone(this.value);
    });

    listarClientes();
});

function salvarCliente(){

let cliente=document.getElementById('cliente').value;
let telefone=document.getElementById('telefone').value;
let cidade=document.getElementById('cidade').value;
let estado=document.getElementById('estado').value;

if(!cliente){
alert("Informe o cliente");
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
tabela.innerHTML="";

clientes.forEach((c,index)=>{

tabela.innerHTML += `
<tr>
<td>${c.cliente}</td>
<td>${c.telefone}</td>
<td>${c.cidade}</td>
<td>${c.estado}</td>
<td><button onclick="excluirCliente(${index})">Excluir</button></td>
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

document.getElementById('cliente').value="";
document.getElementById('telefone').value="";
document.getElementById('cidade').value="";
document.getElementById('estado').value="";

}
