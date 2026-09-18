import 'bootstrap/dist/css/bootstrap.min.css';
import './style/theme.css';
import './App.css';
import GenericList from './components/templates/GenericList';
import { getProdutos } from './services/produto.service';

function App() {
  return (
    <div className="App">
      <header className="app-header p-3 mb-4 border-bottom">
        <div className="container">
          <h1 className="h4 mb-0 fw-bold app-header-title">Sistema de Gestão</h1>
        </div>
      </header>

      <main>
        <GenericList title="Listagem dos Produtos" fetchData={getProdutos} />
      </main>
    </div>
  );
}

export default App;
