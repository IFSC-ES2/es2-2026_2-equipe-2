import 'bootstrap/dist/css/bootstrap.min.css';
import GenericList from './components/templates/GenericList';

function App() {
  return (
    <div className="App">
      <header className="bg-dark text-white p-3 mb-4">
        <div className="container">
          <h1 className="h3 mb-0">Sistema de Gestão</h1>
        </div>
      </header>

      <main>
        <GenericList
          title="Listagem de Estoque (Genérica)"
          apiUrl="http://localhost:5000/api/estoque-list"
        />
      </main>
    </div>
  );
}

export default App;
