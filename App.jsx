export default function App(){
 return (
  <div className="container">
   <h1>Controle Transportadora</h1>

   <div className="card">
    <h2>Dashboard Financeiro</h2>
    <p>Faturamento: R$ 0,00</p>
    <p>Recebido: R$ 0,00</p>
    <p>Pendente: R$ 0,00</p>
   </div>

   <div className="card">
    <h2>Cadastro de Cliente</h2>
    <input placeholder="Nome do cliente"/>
    <input placeholder="Telefone"/>
    <input placeholder="Cidade"/>
    <button>Salvar Cliente</button>
   </div>

   <div className="card">
    <h2>Nova Entrega</h2>
    <input placeholder="Quantidade de sacos"/>
    <input placeholder="Quantidade de caixas"/>
    <input placeholder="Valor total"/>
    <button>Salvar Transporte</button>
   </div>
  </div>
 )
}
