
let clientes=JSON.parse(localStorage.getItem('clientes'))||[];
let movimentos=JSON.parse(localStorage.getItem('movimentos'))||[];

document.addEventListener('input',e=>{
 if(e.target.tagName==='INPUT' && e.target.type!=='number' && e.target.type!=='date' && e.target.id!=='telefoneCliente'){
  e.target.value=e.target.value.toUpperCase();
 }
});

function mostrarCadastro(){
 cadastro.style.display='block';
}

function salvarCliente(){
 if(!nomeCliente.value||!telefoneCliente.value||!cidadeCliente.value||!estadoCliente.value){
  alert('PREENCHA TODOS OS CAMPOS'); return;
 }
 clientes.push({nome:nomeCliente.value,telefone:telefoneCliente.value,cidade:cidadeCliente.value,estado:estadoCliente.value});
 localStorage.setItem('clientes',JSON.stringify(clientes));
 cadastro.style.display='none';
 carregarClientes();
}

function buscarCliente(){
 let t=buscaCliente.value.toUpperCase();
 clientesLista.innerHTML=clientes.filter(c=>c.nome.includes(t)).map((c,i)=>`<tr><td>${c.nome}</td><td>${c.telefone}</td><td>${c.cidade}</td><td>${c.estado}</td><td>ALTERAR | EXCLUIR</td></tr>`).join('');
}

function buscarClienteMov(){
 let t=buscaMovCliente.value.toUpperCase();
 cliente.innerHTML=clientes.filter(c=>c.nome.includes(t)).map(c=>`<option>${c.nome}</option>`).join('');
}

function carregarClientes(){
 clientesLista.innerHTML='';
 cliente.innerHTML='';
}

function salvarMov(){
 if(!data.value)return alert('INFORME A DATA');
 movimentos.push({data:data.value,cliente:cliente.value,caixas:+caixas.value,sacos:+sacos.value,valor:+valor.value,pago:+pago.value});
 localStorage.setItem('movimentos',JSON.stringify(movimentos));
 mostrar();
}

function mostrar(){
 relatorio.innerHTML=movimentos.map(m=>`<tr><td>${m.data}</td><td>${m.cliente}</td><td>${m.caixas}</td><td>${m.sacos}</td><td>${m.caixas+m.sacos}</td><td>${m.valor}</td><td>${m.pago}</td><td>${m.valor-m.pago}</td></tr>`).join('');
}

carregarClientes();
mostrar();
