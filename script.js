
let dados=JSON.parse(localStorage.getItem('transportes'))||[];
let filtrados=dados;

function salvar(){
dados.push({
data:data.value,
cliente:cliente.value,
caixas:Number(caixas.value),
sacos:Number(sacos.value),
valor:Number(valor.value),
pago:Number(pago.value)
});
localStorage.setItem('transportes',JSON.stringify(dados));
mostrar();
}

function aplicar(lista){
let clientes={};
lista.forEach(x=>{
if(!clientes[x.cliente]) clientes[x.cliente]={caixas:0,sacos:0,valor:0,pago:0};
clientes[x.cliente].caixas+=x.caixas;
clientes[x.cliente].sacos+=x.sacos;
clientes[x.cliente].valor+=x.valor;
clientes[x.cliente].pago+=x.pago;
});

let html="",tc=0,ts=0,tv=0,tp=0;

Object.keys(clientes).forEach(c=>{
let x=clientes[c];
html+=`<tr><td>${c}</td><td>${x.caixas}</td><td>${x.sacos}</td><td>${x.caixas+x.sacos}</td><td>R$ ${x.valor}</td><td>R$ ${x.pago}</td><td>R$ ${x.valor-x.pago}</td></tr>`;
tc+=x.caixas; ts+=x.sacos; tv+=x.valor; tp+=x.pago;
});

listaEl.innerHTML=html;
cx.innerHTML=tc;
sc.innerHTML=ts;
it.innerHTML=tc+ts;
vt.innerHTML="R$ "+tv;
vp.innerHTML="R$ "+tp;
vr.innerHTML="R$ "+(tv-tp);
}

function mostrar(){aplicar(dados)}

function filtrarPeriodo(){
let a=inicio.value,b=fim.value;
aplicar(dados.filter(x=>x.data>=a && x.data<=b));
}

function filtrarHoje(){
let d=new Date().toISOString().slice(0,10);
aplicar(dados.filter(x=>x.data==d));
}

function filtrarSemana(){
let hoje=new Date();
let inicioSemana=new Date();
inicioSemana.setDate(hoje.getDate()-6);
aplicar(dados.filter(x=>{
let d=new Date(x.data);
return d>=inicioSemana && d<=hoje;
}));
}

function filtrarMes(){
let m=new Date().getMonth();
let a=new Date().getFullYear();
aplicar(dados.filter(x=>{
let d=new Date(x.data);
return d.getMonth()==m && d.getFullYear()==a;
}));
}

mostrar();
