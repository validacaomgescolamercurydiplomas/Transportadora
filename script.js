let dados=JSON.parse(localStorage.getItem('transportes'))||[];

function salvar(){
let item={
cliente:cliente.value,
caixas:Number(caixas.value),
sacos:Number(sacos.value),
valor:Number(valor.value),
pago:Number(pago.value)
};

dados.push(item);
localStorage.setItem('transportes',JSON.stringify(dados));
mostrar();
}

function mostrar(){

let tabela="";
let totalCx=0,totalSc=0,totalV=0,totalP=0;

let clientes={};

dados.forEach(x=>{
if(!clientes[x.cliente])
clientes[x.cliente]={caixas:0,sacos:0,valor:0,pago:0};

clientes[x.cliente].caixas+=x.caixas;
clientes[x.cliente].sacos+=x.sacos;
clientes[x.cliente].valor+=x.valor;
clientes[x.cliente].pago+=x.pago;
});

Object.keys(clientes).forEach(c=>{
let x=clientes[c];
tabela+=`<tr>
<td>${c}</td>
<td>${x.caixas}</td>
<td>${x.sacos}</td>
<td>${x.caixas+x.sacos}</td>
<td>R$ ${x.valor}</td>
<td>R$ ${x.pago}</td>
<td>R$ ${x.valor-x.pago}</td>
</tr>`;

totalCx+=x.caixas;
totalSc+=x.sacos;
totalV+=x.valor;
totalP+=x.pago;
});

lista.innerHTML=tabela;

cx.innerHTML=totalCx;
sc.innerHTML=totalSc;
it.innerHTML=totalCx+totalSc;
vt.innerHTML="R$ "+totalV;
vp.innerHTML="R$ "+totalP;
vr.innerHTML="R$ "+(totalV-totalP);
}

mostrar();
