let clientes=JSON.parse(localStorage.getItem('clientes'))||[];
let movimentos=JSON.parse(localStorage.getItem('movimentos'))||[];

function salvarCliente(){
clientes.push({nome:nomeCliente.value,telefone:telefoneCliente.value,cidade:cidadeCliente.value,estado:estadoCliente.value});
localStorage.setItem('clientes',JSON.stringify(clientes));
carregar();
}

function carregar(){
cliente.innerHTML=clientes.map(c=>`<option>${c.nome}</option>`).join('');
mostrar(movimentos);
}

function salvarMov(){
if(!data.value){alert('Informe a data');return}
movimentos.push({data:data.value,cliente:cliente.value,caixas:+caixas.value,sacos:+sacos.value,valor:+valor.value,pago:+pago.value});
localStorage.setItem('movimentos',JSON.stringify(movimentos));
mostrar(movimentos);
resumoSemanal();
}

function mostrar(lista){
relatorio.innerHTML=lista.map(m=>`<tr><td>${m.data}</td><td>${m.cliente}</td><td>${m.caixas}</td><td>${m.sacos}</td><td>${m.caixas+m.sacos}</td><td>R$${m.valor}</td><td>R$${m.pago}</td><td>R$${m.valor-m.pago}</td></tr>`).join('');
}

function resumoSemanal(){
let hoje=new Date();
let dia=hoje.getDay();
let inicio=new Date(hoje);
inicio.setDate(hoje.getDate()-(dia==0?6:dia-1));
let fim=new Date(inicio);
fim.setDate(inicio.getDate()+6);
filtrar(inicio,fim);
}

function filtrarResumo(){
filtrar(new Date(inicioResumo.value),new Date(fimResumo.value));
}

function filtrar(a,b){
let lista=movimentos.filter(m=>{let d=new Date(m.data);return d>=a&&d<=b});
let caixas=0,sacos=0,valor=0,pago=0;
lista.forEach(m=>{caixas+=m.caixas;sacos+=m.sacos;valor+=m.valor;pago+=m.pago});
resumo.innerHTML=`Caixas: ${caixas} | Sacos: ${sacos} | Itens: ${caixas+sacos} | Total: R$${valor} | Pago: R$${pago} | Restante: R$${valor-pago}`;
}

carregar();
resumoSemanal();
