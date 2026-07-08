
let clientes=[];

async function carregar(){
 try{
  const r=await fetch('clientes.json?'+Date.now());
  clientes=await r.json();
  listar();
 }catch(e){}
}

function salvarCliente(){

const novo={
 id:Date.now(),
 cliente:document.getElementById('cliente').value,
 telefone:document.getElementById('telefone').value,
 cidade:document.getElementById('cidade').value,
 estado:document.getElementById('estado').value
};

if(!novo.cliente){
 alert('Informe o cliente');
 return;
}

document.getElementById('status').innerHTML=
'Cliente preparado para envio ao GitHub.';

console.log(novo);

// Próxima etapa: envio automático para entrada.json via API

}

function listar(){
let tabela=document.getElementById('lista');
tabela.innerHTML='';

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

carregar();
