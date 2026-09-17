import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import GenericList from './components/templates/GenericList';
import GenericCreate from './components/templates/GenericSave';
import type { TableDataRow } from './components/organisms/GenericTable';

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
        {currentScreen === 'list' && (
          <GenericList
            title="Listagem de Estoque (Genérica)"
            apiUrl="http://localhost:5000/api/estoque"
            onCreate={() => setCurrentScreen('create')}
            onEdit={handleEdit}
          />
        )}

        {currentScreen === 'create' && (
          <GenericCreate
            title="Cadastro de Item de Estoque"
            apiUrl="http://localhost:5000/api/estoque/cadastro"
            method="POST"
            submitLabel="Cadastrar Item"
            onBack={() => setCurrentScreen('list')}
          />
        )}

        {currentScreen === 'edit' && selectedItemId && (
          <GenericCreate
            title="Edição de Item de Estoque"
            apiUrl={`http://localhost:5000/api/estoque/${selectedItemId}/edicao`}
            method="PUT"
            submitLabel="Salvar Alterações"
            onBack={() => setCurrentScreen('list')}
          />
        )}
      </main>
    </div>
  );
}

export default App;
