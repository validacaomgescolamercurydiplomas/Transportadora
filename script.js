let clientes=JSON.parse(localStorage.getItem('clientes'))||[];
let movimentos=JSON.parse(localStorage.getItem('movimentos'))||[];

function salvarCliente(){
clientes.push({nome:nomeCliente.value,telefone:telefoneCliente.value,cidade:cidadeCliente.value,estado:estadoCliente.value});
localStorage.setItem('clientes',JSON.stringify(clientes));
carregar();
}

function excluirCliente(i){
if(confirm('Excluir este cliente?')){
clientes.splice(i,1);
localStorage.setItem('clientes',JSON.stringify(clientes));
carregar();
}
}

function carregar(){
cliente.innerHTML='';
clientes.forEach(c=>cliente.innerHTML+=`<option>${c.nome}</option>`);
clientesLista.innerHTML=clientes.map((c,i)=>`<tr><td>${c.nome}</td><td>${c.telefone}</td><td>${c.cidade}</td><td>${c.estado}</td><td><button onclick="excluirCliente(${i})">Excluir</button></td></tr>`).join('');
mostrar();
}

function salvarMovimento(){
movimentos.push({data:data.value,cliente:cliente.value,caixas:+caixas.value,sacos:+sacos.value,valor:+valor.value,pago:+pago.value});
localStorage.setItem('movimentos',JSON.stringify(movimentos));
mostrar();
}

function excluirMovimento(i){
if(confirm('Excluir esta movimentação?')){
movimentos.splice(i,1);
localStorage.setItem('movimentos',JSON.stringify(movimentos));
mostrar();
}
}

function mostrar(){
relatorio.innerHTML=movimentos.map((m,i)=>`<tr><td>${m.data}</td><td>${m.cliente}</td><td>${m.caixas}</td><td>${m.sacos}</td><td>${m.caixas+m.sacos}</td><td>R$${m.valor}</td><td>R$${m.pago}</td><td>R$${m.valor-m.pago}</td><td><button onclick="excluirMovimento(${i})">Excluir</button></td></tr>`).join('');
}

carregar();
