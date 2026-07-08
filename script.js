let clientes=JSON.parse(localStorage.getItem('clientes'))||[];
let movimentos=JSON.parse(localStorage.getItem('movimentos'))||[];

function salvarCliente(){
let nome=document.getElementById('nomeCliente').value;
if(!nome){alert('Informe o cliente');return;}
clientes.push({nome,telefone:telefoneCliente.value,cidade:cidadeCliente.value,estado:estadoCliente.value});
localStorage.setItem('clientes',JSON.stringify(clientes));
carregarClientes();
alert('Cliente salvo');
}

function carregarClientes(){
cliente.innerHTML='';
clientes.forEach(c=>cliente.innerHTML+=`<option>${c.nome}</option>`);
listarClientes();
}

function listarClientes(){
let termo=busca.value.toLowerCase();
clientesLista.innerHTML='';
clientes.filter(c=>(c.nome+c.telefone+c.cidade+c.estado).toLowerCase().includes(termo))
.forEach(c=>clientesLista.innerHTML+=`<tr><td>${c.nome}</td><td>${c.telefone}</td><td>${c.cidade}</td><td>${c.estado}</td></tr>`);
}

function salvarMovimento(){
movimentos.push({data:data.value,cliente:cliente.value,caixas:+caixas.value,sacos:+sacos.value,valor:+valor.value,pago:+pago.value});
localStorage.setItem('movimentos',JSON.stringify(movimentos));
mostrarTodos();
}

function gerar(lista){
let r={};let cx=0,sc=0,v=0,p=0;
lista.forEach(x=>{if(!r[x.cliente])r[x.cliente]={caixas:0,sacos:0,valor:0,pago:0};r[x.cliente].caixas+=x.caixas;r[x.cliente].sacos+=x.sacos;r[x.cliente].valor+=x.valor;r[x.cliente].pago+=x.pago});
relatorio.innerHTML='';
Object.keys(r).forEach(c=>{let x=r[c];relatorio.innerHTML+=`<tr><td>${c}</td><td>${x.caixas}</td><td>${x.sacos}</td><td>${x.caixas+x.sacos}</td><td>R$${x.valor}</td><td>R$${x.pago}</td><td>R$${x.valor-x.pago}</td></tr>`;cx+=x.caixas;sc+=x.sacos;v+=x.valor;p+=x.pago});
totalCaixas.innerHTML=cx;totalSacos.innerHTML=sc;totalItens.innerHTML=cx+sc;totalValor.innerHTML='R$'+v;totalPago.innerHTML='R$'+p;totalRestante.innerHTML='R$'+(v-p);
}

function mostrarTodos(){gerar(movimentos)}
function filtrarMes(){let m=new Date().getMonth();gerar(movimentos.filter(x=>new Date(x.data).getMonth()==m))}
function filtrarPeriodo(){gerar(movimentos.filter(x=>x.data>=inicio.value&&x.data<=fim.value))}

carregarClientes();
mostrarTodos();
