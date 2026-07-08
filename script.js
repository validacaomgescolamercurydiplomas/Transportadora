let clientes=JSON.parse(localStorage.getItem('clientes'))||[];
let movimentos=JSON.parse(localStorage.getItem('movimentos'))||[];
let editCliente=-1, editMov=-1;

function salvarCliente(){
 let obj={nome:nomeCliente.value,telefone:telefoneCliente.value,cidade:cidadeCliente.value,estado:estadoCliente.value};
 if(editCliente>=0) clientes[editCliente]=obj; else clientes.push(obj);
 localStorage.setItem('clientes',JSON.stringify(clientes));
 editCliente=-1; limparCliente(); carregar();
}
function editarCliente(i){
 editCliente=i; let c=clientes[i];
 nomeCliente.value=c.nome;telefoneCliente.value=c.telefone;cidadeCliente.value=c.cidade;estadoCliente.value=c.estado;
}
function cancelarCliente(){editCliente=-1;limparCliente()}
function limparCliente(){nomeCliente.value=telefoneCliente.value=cidadeCliente.value=estadoCliente.value=''}
function carregar(){
 cliente.innerHTML='';clientes.forEach(c=>cliente.innerHTML+=`<option>${c.nome}</option>`);
 clientesLista.innerHTML=clientes.map((c,i)=>`<tr><td>${c.nome}</td><td>${c.telefone}</td><td>${c.cidade}</td><td>${c.estado}</td><td><button onclick="editarCliente(${i})">Alterar</button></td></tr>`).join('');
 mostrar();
}
function salvarMovimento(){
 let m={data:data.value,cliente:cliente.value,caixas:+caixas.value,sacos:+sacos.value,valor:+valor.value,pago:+pago.value};
 if(editMov>=0) movimentos[editMov]=m; else movimentos.push(m);
 localStorage.setItem('movimentos',JSON.stringify(movimentos));editMov=-1;mostrar();
}
function editarMov(i){editMov=i;let m=movimentos[i];data.value=m.data;cliente.value=m.cliente;caixas.value=m.caixas;sacos.value=m.sacos;valor.value=m.valor;pago.value=m.pago}
function cancelarMov(){editMov=-1}
function mostrar(){
 relatorio.innerHTML=movimentos.map((m,i)=>`<tr><td>${m.data}</td><td>${m.cliente}</td><td>${m.caixas}</td><td>${m.sacos}</td><td>${m.caixas+m.sacos}</td><td>${m.valor}</td><td>${m.pago}</td><td>${m.valor-m.pago}</td><td><button onclick="editarMov(${i})">Alterar</button></td></tr>`).join('');
}
carregar();