export default function App(){
return <div className="box">
<h1>Controle Transportadora</h1>
<h2>Dashboard Financeiro</h2>
<p>Faturamento: R$ 0</p>
<p>Recebido: R$ 0</p>
<p>Pendente: R$ 0</p>

<h2>Cadastro Cliente</h2>
<input placeholder="Nome do cliente"/>
<input placeholder="Telefone"/>
<button>Salvar</button>

<h2>Nova Entrega</h2>
<input placeholder="Quantidade Sacos"/>
<input placeholder="Quantidade Caixas"/>
<input placeholder="Valor"/>
<button>Registrar</button>
</div>
}
