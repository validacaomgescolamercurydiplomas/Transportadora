
const CONFIG = {
 usuario: "SEU_USUARIO",
 repositorio: "Transportadora",
 arquivo: "clientes.json"
};

function mascaraTelefone(el){
 let v = el.value.replace(/\D/g,'').substring(0,11);
 if(v.length > 10){
  el.value = v.replace(/(\d{2})(\d{5})(\d{4})/,'($1) $2-$3');
 }else{
  el.value = v.replace(/(\d{2})(\d{4})(\d{4})/,'($1) $2-$3');
 }
}

async function salvarCliente(){

const cliente={
 id:Date.now(),
 cliente:document.getElementById('cliente').value,
 telefone:document.getElementById('telefone').value,
 cidade:document.getElementById('cidade').value,
 estado:document.getElementById('estado').value
};

if(!cliente.cliente){
 alert("Informe o cliente");
 return;
}

// Envia para o fluxo seguro do GitHub Actions
await fetch("https://api.github.com/repos/"+CONFIG.usuario+"/"+CONFIG.repositorio+"/dispatches",{
 method:"POST",
 headers:{
  "Accept":"application/vnd.github+json"
 },
 body:JSON.stringify({
  event_type:"novo_cliente",
  client_payload:cliente
 })
});

document.getElementById("msg").innerHTML="Cliente enviado para o GitHub.";

}

async function carregar(){
 try{
 const r=await fetch("clientes.json?"+Date.now());
 const dados=await r.json();
 const lista=document.getElementById("lista");
 dados.forEach(c=>{
 lista.innerHTML += `<tr><td>${c.cliente}</td><td>${c.telefone}</td><td>${c.cidade}</td><td>${c.estado}</td></tr>`;
 });
 }catch(e){}
}

carregar();
