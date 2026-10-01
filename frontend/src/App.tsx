import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './style/theme.css';
import './App.css';
import Estoque from './pages/Estoque';
import Dashboard from './pages/Dashboard';
import Vendas from './pages/Vendas';
import Financas from './pages/Financas';
import Cliente from './pages/Cliente';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/estoque" element={<Estoque />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/vendas" element={<Vendas />} />
          <Route path="/financas" element={<Financas />} />
          <Route path="/clientes" element={<Cliente />} />
          <Route path="/" element={<Navigate to="/estoque" replace />} />
          <Route path="*" element={<Navigate to="/estoque" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
