
let clientes=JSON.parse(localStorage.getItem('clientes'))||[];
let movimentos=JSON.parse(localStorage.getItem('movimentos'))||[];

function mascaraTelefone(i){
let v=i.value.replace(/\D/g,'');
if(v.length>10){
i.value='('+v.substring(0,2)+') '+v.substring(2,7)+'-'+v.substring(7,11);
}else if(v.length>6){
i.value='('+v.substring(0,2)+') '+v.substring(2);
}
}

function salvarCliente(){
if(!nomeCliente.value){alert('Informe o cliente');return}
clientes.push({
nome:nomeCliente.value,
telefone:telefoneCliente.value,
cidade:cidadeCliente.value,
estado:estadoCliente.value
});
localStorage.setItem('clientes',JSON.stringify(clientes));
carregarClientes();
}

function cancelarCliente(){
nomeCliente.value='';
telefoneCliente.value='';
cidadeCliente.value='';
estadoCliente.value='';
}

function carregarClientes(){
cliente.innerHTML='';
clientes.forEach(c=>cliente.innerHTML+=`<option>${c.nome}</option>`);
listarClientes();
}

function listarClientes(){
clientesLista.innerHTML='';
clientes.forEach(c=>{
clientesLista.innerHTML+=`<tr><td>${c.nome}</td><td>${c.telefone}</td><td>${c.cidade}</td><td>${c.estado}</td></tr>`;
});
}

function salvarMovimento(){
if(!data.value){alert('Informe a data');return}
movimentos.push({
data:data.value,
cliente:cliente.value,
caixas:+caixas.value,
sacos:+sacos.value,
valor:+valor.value,
pago:+pago.value
});
localStorage.setItem('movimentos',JSON.stringify(movimentos));
mostrar();
}

function mostrar(){
relatorio.innerHTML='';
movimentos.forEach(x=>{
relatorio.innerHTML+=`<tr><td>${x.data.split('-').reverse().join('/')}</td><td>${x.cliente}</td><td>${x.caixas}</td><td>${x.sacos}</td><td>${x.caixas+x.sacos}</td><td>R$${x.valor}</td><td>R$${x.pago}</td><td>R$${x.valor-x.pago}</td></tr>`;
});
}

carregarClientes();
mostrar();
