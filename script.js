let clientes=JSON.parse(localStorage.getItem('clientes'))||[];
let movimentos=JSON.parse(localStorage.getItem('movimentos'))||[];
let editCliente=-1;
let editMov=-1;

document.addEventListener('input',e=>{
 if(e.target.tagName==="INPUT" && e.target.type!=="number" && e.target.type!=="date" && e.target.id!=="telefoneCliente"){
   e.target.value=e.target.value.toUpperCase();
 }
});

telefoneCliente.addEventListener('input',function(){
 let v=this.value.replace(/\D/g,'').slice(0,11);
 if(v.length<=2) this.value=v;
 else if(v.length<=7) this.value='('+v.slice(0,2)+') '+v.slice(2);
 else this.value='('+v.slice(0,2)+') '+v.slice(2,7)+'-'+v.slice(7);
});

function salvarCliente(){
 let obj={nome:nomeCliente.value,telefone:telefoneCliente.value,cidade:cidadeCliente.value,estado:estadoCliente.value};
 if(!obj.nome){alert('INFORME O CLIENTE');return}
 if(editCliente>=0) clientes[editCliente]=obj; else clientes.push(obj);
 localStorage.setItem('clientes',JSON.stringify(clientes));
 editCliente=-1;
 limparCliente();
 carregar();
}

function editarCliente(i){
 editCliente=i;
 let c=clientes[i];
 nomeCliente.value=c.nome;
 telefoneCliente.value=c.telefone;
 cidadeCliente.value=c.cidade;
 estadoCliente.value=c.estado;
}

function excluirCliente(i){
 if(confirm('Excluir cliente?')){
 clientes.splice(i,1);
 localStorage.setItem('clientes',JSON.stringify(clientes));
 carregar();
 }
}

function cancelarCliente(){editCliente=-1;limparCliente()}
function limparCliente(){nomeCliente.value='';telefoneCliente.value='';cidadeCliente.value='';estadoCliente.value=''}

function carregar(){
 cliente.innerHTML=clientes.map(c=>`<option>${c.nome}</option>`).join('');
 clientesLista.innerHTML=clientes.map((c,i)=>`<tr><td>${c.nome}</td><td>${c.telefone}</td><td>${c.cidade}</td><td>${c.estado}</td><td><button onclick="editarCliente(${i})">ALTERAR</button><button onclick="excluirCliente(${i})">EXCLUIR</button></td></tr>`).join('');
 mostrar();
}

function salvarMov(){
 if(!data.value){alert('INFORME A DATA');return}
 let m={data:data.value,cliente:cliente.value,caixas:+caixas.value,sacos:+sacos.value,valor:+valor.value,pago:+pago.value};
 if(editMov>=0) movimentos[editMov]=m; else movimentos.push(m);
 localStorage.setItem('movimentos',JSON.stringify(movimentos));
 editMov=-1;
 mostrar();
}

function editarMov(i){
 editMov=i;
 let m=movimentos[i];
 data.value=m.data;
 cliente.value=m.cliente;
 caixas.value=m.caixas;
 sacos.value=m.sacos;
 valor.value=m.valor;
 pago.value=m.pago;
}

function excluirMov(i){
 if(confirm('Excluir movimentação?')){
 movimentos.splice(i,1);
 localStorage.setItem('movimentos',JSON.stringify(movimentos));
 mostrar();
 }
}

function mostrar(){
 relatorio.innerHTML=movimentos.map((m,i)=>`<tr><td>${m.data.split('-').reverse().join('/')}</td><td>${m.cliente}</td><td>${m.caixas}</td><td>${m.sacos}</td><td>${m.caixas+m.sacos}</td><td>R$${m.valor}</td><td>R$${m.pago}</td><td>R$${m.valor-m.pago}</td><td><button onclick="editarMov(${i})">ALTERAR</button><button onclick="excluirMov(${i})">EXCLUIR</button></td></tr>`).join('');
}
carregar();
