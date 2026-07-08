
let clientes=JSON.parse(localStorage.getItem('clientes'))||[];
let movimentos=JSON.parse(localStorage.getItem('movimentos'))||[];

document.addEventListener('input',e=>{
 if(e.target.tagName==='INPUT' && e.target.type!=='number' && e.target.type!=='date'){
  let pos=e.target.selectionStart;
  e.target.value=e.target.value.toUpperCase();
  e.target.setSelectionRange(pos,pos);
 }
});

telefoneCliente.addEventListener('input',function(){
 let v=this.value.replace(/\D/g,'');
 if(v.length>10)this.value='('+v.slice(0,2)+') '+v.slice(2,7)+'-'+v.slice(7,11);
});

function salvarCliente(){
 if(!nomeCliente.value){alert('INFORME O CLIENTE');return;}
 clientes.push({nome:nomeCliente.value,telefone:telefoneCliente.value,cidade:cidadeCliente.value,estado:estadoCliente.value});
 localStorage.setItem('clientes',JSON.stringify(clientes));
 carregar();
}

function carregar(){
 cliente.innerHTML='';
 clientes.forEach(c=>cliente.innerHTML+=`<option>${c.nome}</option>`);
 clientesLista.innerHTML=clientes.map(c=>`<tr><td>${c.nome}</td><td>${c.telefone}</td><td>${c.cidade}</td><td>${c.estado}</td></tr>`).join('');
}

function salvarMov(){
 if(!data.value){alert('INFORME A DATA');return;}
 movimentos.push({data:data.value,cliente:cliente.value,caixas:+caixas.value,sacos:+sacos.value,valor:+valor.value,pago:+pago.value});
 localStorage.setItem('movimentos',JSON.stringify(movimentos));
 mostrar();
}

function mostrar(){
 relatorio.innerHTML=movimentos.map(m=>`<tr><td>${m.data}</td><td>${m.cliente}</td><td>${m.caixas}</td><td>${m.sacos}</td><td>${m.caixas+m.sacos}</td><td>${m.valor}</td><td>${m.pago}</td><td>${m.valor-m.pago}</td></tr>`).join('');
}
carregar();
mostrar();
