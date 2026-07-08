
let clientes=JSON.parse(localStorage.getItem('clientes'))||[];
let movimentos=JSON.parse(localStorage.getItem('movimentos'))||[];
let editCliente=-1;

document.addEventListener('input',e=>{
 if(e.target.tagName==="INPUT" && e.target.type!=="number" && e.target.type!=="date" && e.target.id!=="telefoneCliente"){
 e.target.value=e.target.value.toUpperCase();
 }
});

telefoneCliente.addEventListener('input',function(){
 let v=this.value.replace(/\D/g,'').slice(0,11);
 if(v.length>7)this.value='('+v.slice(0,2)+') '+v.slice(2,7)+'-'+v.slice(7);
 else if(v.length>2)this.value='('+v.slice(0,2)+') '+v.slice(2);
});

function validarCliente(){
 if(nomeCliente.value.trim().length<3){alert('INFORME O NOME DO CLIENTE');return false}
 if(telefoneCliente.value.replace(/\D/g,'').length!==11){alert('INFORME TELEFONE VALIDO');return false}
 if(!cidadeCliente.value){alert('INFORME A CIDADE');return false}
 if(!estadoCliente.value){alert('SELECIONE O ESTADO');return false}
 return true;
}

function salvarCliente(){
 if(!validarCliente())return;
 let c={nome:nomeCliente.value,telefone:telefoneCliente.value,cidade:cidadeCliente.value,estado:estadoCliente.value};
 if(editCliente>=0)clientes[editCliente]=c;else clientes.push(c);
 localStorage.setItem('clientes',JSON.stringify(clientes));
 carregar();
}

function editarCliente(i){editCliente=i;let c=clientes[i];nomeCliente.value=c.nome;telefoneCliente.value=c.telefone;cidadeCliente.value=c.cidade;estadoCliente.value=c.estado}

function excluirCliente(i){if(confirm('Excluir cliente?')){clientes.splice(i,1);localStorage.setItem('clientes',JSON.stringify(clientes));carregar()}}

function carregar(){
cliente.innerHTML=clientes.map(c=>`<option>${c.nome}</option>`).join('');
clientesLista.innerHTML=clientes.map((c,i)=>`<tr><td>${c.nome}</td><td>${c.telefone}</td><td>${c.cidade}</td><td>${c.estado}</td><td><button onclick="editarCliente(${i})">ALTERAR</button><button onclick="excluirCliente(${i})">EXCLUIR</button></td></tr>`).join('');
mostrar();
}

function salvarMov(){
if(!data.value){alert('INFORME A DATA');return}
movimentos.push({data:data.value,cliente:cliente.value,caixas:+caixas.value,sacos:+sacos.value,valor:+valor.value,pago:+pago.value});
localStorage.setItem('movimentos',JSON.stringify(movimentos));mostrar();
}

function mostrar(){
relatorio.innerHTML=movimentos.map((m,i)=>`<tr><td>${m.data}</td><td>${m.cliente}</td><td>${m.caixas}</td><td>${m.sacos}</td><td>${m.caixas+m.sacos}</td><td>${m.valor}</td><td>${m.pago}</td><td>${m.valor-m.pago}</td><td><button>ALTERAR</button><button>EXCLUIR</button></td></tr>`).join('');
}
carregar();
