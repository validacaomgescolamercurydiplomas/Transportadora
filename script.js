
async function carregar(){
try{
const r=await fetch('clientes.json?'+Date.now());
const dados=await r.json();
mostrar(dados);
}catch(e){}
}

function mascaraTelefone(el){
let v=el.value.replace(/\D/g,'').substring(0,11);

if(v.length<=10){
el.value=v.replace(/(\d{2})(\d{4})(\d{0,4})/,'($1) $2-$3');
}else{
el.value=v.replace(/(\d{2})(\d{5})(\d{0,4})/,'($1) $2-$3');
}
}

function salvarCliente(){

const cliente={
id:Date.now(),
cliente:document.getElementById('cliente').value,
telefone:document.getElementById('telefone').value,
cidade:document.getElementById('cidade').value,
estado:document.getElementById('estado').value
};

if(!cliente.cliente){
alert('Digite o cliente');
return;
}

localStorage.setItem('novo_cliente',JSON.stringify(cliente));

document.getElementById('msg').innerHTML=
'Cliente enviado para processamento do GitHub.';

document.getElementById('cliente').value='';
document.getElementById('telefone').value='';
document.getElementById('cidade').value='';

console.log(cliente);
}

function mostrar(lista){
const corpo=document.getElementById('lista');
corpo.innerHTML='';

lista.forEach(c=>{
corpo.innerHTML += `
<tr>
<td>${c.cliente}</td>
<td>${c.telefone}</td>
<td>${c.cidade}</td>
<td>${c.estado}</td>
</tr>`;
});
}

carregar();
