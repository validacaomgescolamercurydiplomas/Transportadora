let clientes = JSON.parse(localStorage.getItem('clientes')) || [];

const nome = document.getElementById('nomeCliente');
const telefone = document.getElementById('telefoneCliente');
const cidade = document.getElementById('cidadeCliente');
const estado = document.getElementById('estadoCliente');
const lista = document.getElementById('clientesLista');
const select = document.getElementById('clienteSelect');

document.getElementById('btnSalvarCliente').addEventListener('click', function(){
    if(!nome.value.trim()){
        mensagem.innerHTML = 'Informe o nome do cliente';
        return;
    }

    clientes.push({
        nome:nome.value,
        telefone:telefone.value,
        cidade:cidade.value,
        estado:estado.value
    });

    localStorage.setItem('clientes', JSON.stringify(clientes));

    mensagem.innerHTML = 'Cliente salvo com sucesso!';

    nome.value='';
    telefone.value='';
    cidade.value='';
    estado.value='';

    carregarClientes();
});

function carregarClientes(){
    lista.innerHTML='';
    select.innerHTML='';

    clientes.forEach(c=>{
        lista.innerHTML += `<tr><td>${c.nome}</td><td>${c.telefone}</td><td>${c.cidade}</td><td>${c.estado}</td></tr>`;
        select.innerHTML += `<option>${c.nome}</option>`;
    });
}

carregarClientes();
