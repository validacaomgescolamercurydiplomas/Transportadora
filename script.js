
let clientes=JSON.parse(localStorage.getItem('clientes'))||[];
let movimentos=JSON.parse(localStorage.getItem('movimentos'))||[];
let editCliente=-1;
let editMov=-1;

document.addEventListener('input',e=>{
 if(e.target.tagName==="INPUT" && e.target.type==="text" && e.target.id!=="telefoneCliente")
 e.target.value=e.target.value.toUpperCase();
});

telefoneCliente.oninput=function(){
 let v=this.value.replace(/\D/g,'').slice(0,11);
 if(v.length>7)this.value='('+v.slice(0,2)+') '+v.slice(2,7)+'-'+v.slice(7);
 else if(v.length>2)this.value='('+v.slice(0,2)+') '+v.slice(2);
};

function validar(){
 if(nomeCliente.value.length<3)return alert("INFORME O NOME"),false;
 if(telefoneCliente.value.replace(/\D/g,'').length!=11)return alert("TELEFONE INVÁLIDO"),false;
 if(!cidadeCliente.value)return alert("INFORME A CIDADE"),false;
 if(!estadoCliente.value)return alert("SELECIONE O ESTADO"),false;
 return true;
}

function salvarCliente(){
 if(!validar())return;
 let c={nome:nomeCliente.value,telefone:telefoneCliente.value,cidade:cidadeCliente.value,estado:estadoCliente.value};
 if(editCliente>=0)clientes[editCliente]=c;else clientes.push(c);
 localStorage.setItem('clientes',JSON.stringify(clientes));
 fecharCadastro();
 carregar();
}

function editarCliente(i){editCliente=i;let c=clientes[i];nomeCliente.value=c.nome;telefoneCliente.value=c.telefone;cidadeCliente.value=c.cidade;estadoCliente.value=c.estado}
function excluirCliente(i){if(confirm("Excluir cliente?")){clientes.splice(i,1);localStorage.setItem('clientes',JSON.stringify(clientes));carregar()}}

function salvarMov(){
 if(!data.value)return alert("INFORME A DATA");
 let m={data:data.value,cliente:cliente.value,caixas:+caixas.value,sacos:+sacos.value,valor:+valor.value,pago:+pago.value};
 if(editMov>=0)movimentos[editMov]=m;else movimentos.push(m);
 localStorage.setItem('movimentos',JSON.stringify(movimentos));
 mostrar();
}

function editarMov(i){editMov=i;let m=movimentos[i];data.value=m.data;cliente.value=m.cliente;caixas.value=m.caixas;sacos.value=m.sacos;valor.value=m.valor;pago.value=m.pago}
function excluirMov(i){if(confirm("Excluir movimentação?")){movimentos.splice(i,1);localStorage.setItem('movimentos',JSON.stringify(movimentos));mostrar()}}


function abrirCadastro(){areaCadastro.style.display='block';}
function fecharCadastro(){areaCadastro.style.display='none';}

function buscarClientes(){
 let termo=buscaCliente.value.toUpperCase();
 if(!termo){
  clientesLista.innerHTML='';
  return;
 }
 clientesLista.innerHTML=clientes.filter(c=>(
 c.nome+c.telefone+c.cidade+c.estado
 ).toUpperCase().includes(termo)).map((c,i)=>`
 <tr><td>${c.nome}</td><td>${c.telefone}</td><td>${c.cidade}</td><td>${c.estado}</td>
 <td><button onclick="editarCliente(${i})">ALTERAR</button>
 <button onclick="excluirCliente(${i})">EXCLUIR</button></td></tr>`).join('');
}

function carregar(){
 cliente.innerHTML='';
 clientesLista.innerHTML='';
 mostrar();
}

function buscarClienteMov(){
 let termo=buscaMovCliente.value.toUpperCase();
 if(!termo){
  cliente.innerHTML='';
  return;
 }
 cliente.innerHTML=clientes.filter(c=>c.nome.toUpperCase().includes(termo))
 .map(c=>`<option>${c.nome}</option>`).join('');
}

function mostrar(lista=movimentos){
 relatorio.innerHTML=lista.map((m,i)=>`<tr><td>${m.data}</td><td>${m.cliente}</td><td>${m.caixas}</td><td>${m.sacos}</td><td>${m.caixas+m.sacos}</td><td>${m.valor}</td><td>${m.pago}</td><td>${m.valor-m.pago}</td><td><button onclick="editarMov(${i})">ALTERAR</button><button onclick="excluirMov(${i})">EXCLUIR</button></td></tr>`).join('');
 resumoPeriodo(lista);
}

function resumoPeriodo(lista){
 let c=0,s=0,v=0,p=0;
 lista.forEach(x=>{c+=x.caixas;s+=x.sacos;v+=x.valor;p+=x.pago});
 resumo.innerHTML=`CAIXAS: ${c} | SACOS: ${s} | ITENS: ${c+s} | TOTAL: R$${v} | PAGO: R$${p} | RESTANTE: R$${v-p}`;
}

function filtrarPeriodo(){
 let a=new Date(inicioResumo.value),b=new Date(fimResumo.value);
 mostrar(movimentos.filter(x=>{let d=new Date(x.data);return d>=a&&d<=b}));
}

carregar();
