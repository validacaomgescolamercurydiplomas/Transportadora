
async function carregar(){
 const r = await fetch('clientes.json?'+Date.now());
 const dados = await r.json();
 const lista=document.getElementById('lista');
 lista.innerHTML='';
 dados.forEach(c=>{
 lista.innerHTML += `<tr>
 <td>${c.cliente}</td>
 <td>${c.telefone}</td>
 <td>${c.cidade}</td>
 <td>${c.estado}</td>
 </tr>`;
 });
}

async function salvarCliente(){

const cliente={
id:Date.now(),
cliente:document.getElementById('cliente').value,
telefone:document.getElementById('telefone').value,
cidade:document.getElementById('cidade').value,
estado:document.getElementById('estado').value
};

localStorage.setItem('novo_cliente',JSON.stringify(cliente));

document.getElementById('msg').innerHTML=
"Cliente preparado para envio. A Action fará a gravação no GitHub.";

console.log(cliente);

// Próxima integração usa GitHub Actions + Secret GH_TOKEN.
// O token permanece protegido no GitHub.

}

carregar();
