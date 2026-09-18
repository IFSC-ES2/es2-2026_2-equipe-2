import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import GenericList from './components/templates/GenericList';
import GenericCreate from './components/templates/GenericCreate';
import type { TableDataRow } from './components/organisms/GenericTable';
import { getProdutos } from './services/produto.service';

type CurrentScreen = 'list' | 'create' | 'edit';

function App() {
  const [currentScreen, setCurrentScreen] = useState<CurrentScreen>('list');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const handleEdit = (row: TableDataRow) => {
    setSelectedItemId(String(row.id));
    setCurrentScreen('edit');
  };

  return (
    <div className="App">
      <header className="bg-dark text-white p-3 mb-4">
        <div className="container">
          <h1 className="h3 mb-0">Sistema de Gestão</h1>
        </div>
      </header>

      <main>
        <GenericList title="Listagem dos Produtos" fetchData={getProdutos} />
      </main>
    </div>
  );
}

export default App;
