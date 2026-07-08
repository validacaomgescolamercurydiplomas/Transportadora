
let clientes=[];

async function carregar(){
 try{
  const r=await fetch('clientes.json?x='+Date.now());
  clientes=await r.json();
  listar();
 }catch(e){
  clientes=[];
 }
}

function salvarCliente(){
 const cliente=document.getElementById('cliente').value;
 const telefone=document.getElementById('telefone').value;
 const cidade=document.getElementById('cidade').value;
 const estado=document.getElementById('estado').value;

 if(!cliente){
  alert('Informe o cliente');
  return;
 }

 const novo={
  id:Date.now(),
  cliente,
  telefone,
  cidade,
  estado
 };

 alert('Cadastro preparado. A gravação será feita pela GitHub Action.');
 console.log(novo);
}

function listar(){
 const lista=document.getElementById('lista');
 lista.innerHTML='';

 clientes.forEach(c=>{
  lista.innerHTML += `
  <tr>
   <td>${c.cliente}</td>
   <td>${c.telefone}</td>
   <td>${c.cidade}</td>
   <td>${c.estado}</td>
  </tr>`;
 });
}

carregar();
