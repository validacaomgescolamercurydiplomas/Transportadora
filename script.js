
let clientes=JSON.parse(localStorage.getItem('clientes'))||[];
let movimentos=JSON.parse(localStorage.getItem('movimentos'))||[];
let editCliente=-1, editMov=-1;

function mascaraTelefone(el){
 let v=el.value.replace(/\D/g,'');
 if(v.length>10) el.value='('+v.slice(0,2)+') '+v.slice(2,7)+'-'+v.slice(7,11);
 else if(v.length>2) el.value='('+v.slice(0,2)+') '+v.slice(2);
}

function salvarCliente(){
 let c={nome:nomeCliente.value,telefone:telefoneCliente.value,cidade:cidadeCliente.value,estado:estadoCliente.value};
 if(editCliente>=0) clientes[editCliente]=c; else clientes.push(c);
 localStorage.setItem('clientes',JSON.stringify(clientes));
 editCliente=-1; limparCliente(); carregar();
}

function editarCliente(i){
 editCliente=i;
 let c=clientes[i];
 nomeCliente.value=c.nome; telefoneCliente.value=c.telefone; cidadeCliente.value=c.cidade; estadoCliente.value=c.estado;
}

function excluirCliente(i){
 if(confirm('Excluir cliente?')){clientes.splice(i,1);localStorage.setItem('clientes',JSON.stringify(clientes));carregar();}
}

function limparCliente(){nomeCliente.value='';telefoneCliente.value='';cidadeCliente.value='';estadoCliente.value='';editCliente=-1;}

function salvarMov(){
 let m={data:data.value,cliente:cliente.value,caixas:+caixas.value,sacos:+sacos.value,valor:+valor.value,pago:+pago.value};
 if(editMov>=0) movimentos[editMov]=m; else movimentos.push(m);
 localStorage.setItem('movimentos',JSON.stringify(movimentos));editMov=-1;mostrar();
}

function editarMov(i){editMov=i;let m=movimentos[i];data.value=m.data;cliente.value=m.cliente;caixas.value=m.caixas;sacos.value=m.sacos;valor.value=m.valor;pago.value=m.pago;}

function excluirMov(i){if(confirm('Excluir lançamento?')){movimentos.splice(i,1);localStorage.setItem('movimentos',JSON.stringify(movimentos));mostrar();}}

function carregar(){
 cliente.innerHTML=clientes.map(c=>`<option>${c.nome}</option>`).join('');
 clientesLista.innerHTML=clientes.map((c,i)=>`<tr><td>${c.nome}</td><td>${c.telefone}</td><td>${c.cidade}</td><td>${c.estado}</td><td><button onclick="editarCliente(${i})">Alterar</button><button onclick="excluirCliente(${i})">Excluir</button></td></tr>`).join('');
 mostrar();
}

function mostrar(){
 relatorio.innerHTML=movimentos.map((m,i)=>`<tr><td>${m.data}</td><td>${m.cliente}</td><td>${m.caixas}</td><td>${m.sacos}</td><td>${m.caixas+m.sacos}</td><td>${m.valor}</td><td>${m.pago}</td><td>${m.valor-m.pago}</td><td><button onclick="editarMov(${i})">Alterar</button><button onclick="excluirMov(${i})">Excluir</button></td></tr>`).join('');
}
carregar();
