let dados=JSON.parse(localStorage.getItem('movimentos'))||[];
let clientes=JSON.parse(localStorage.getItem('clientes'))||[];

function carregar(){
 cliente.innerHTML='';
 clientes.forEach(c=>cliente.innerHTML+=`<option>${c.nome}</option>`);
 mostrar();
}

function salvar(){
 if(!data.value){
  alert('Informe a data da movimentação');
  return;
 }
 dados.push({
  data:data.value,
  cliente:cliente.value,
  caixas:Number(caixas.value),
  sacos:Number(sacos.value),
  valor:Number(valor.value),
  pago:Number(pago.value)
 });
 localStorage.setItem('movimentos',JSON.stringify(dados));
 mostrar();
}

function mostrar(){
 let html='';
 let cx=0,sc=0,v=0,p=0;

 dados.forEach(x=>{
 html+=`<tr>
 <td>${formatarData(x.data)}</td>
 <td>${x.cliente}</td>
 <td>${x.caixas}</td>
 <td>${x.sacos}</td>
 <td>${x.caixas+x.sacos}</td>
 <td>R$${x.valor}</td>
 <td>R$${x.pago}</td>
 <td>R$${x.valor-x.pago}</td>
 </tr>`;
 cx+=x.caixas;sc+=x.sacos;v+=x.valor;p+=x.pago;
 });

 lista.innerHTML=html;
 resumo.innerHTML=`Caixas: ${cx} | Sacos: ${sc} | Itens: ${cx+sc} | Valor: R$${v} | Pago: R$${p} | Restante: R$${v-p}`;
}

function formatarData(d){
 let x=d.split('-');
 return x[2]+'/'+x[1]+'/'+x[0];
}

carregar();
