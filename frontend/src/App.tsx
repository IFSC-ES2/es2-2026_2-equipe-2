import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/theme.css';
import './App.css';
import Estoque from './pages/Estoque';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="app-header p-3 mb-4 border-bottom">
          <div className="container">
            <h1 className="h4 mb-0 fw-bold app-header-title">Sistema de Gestão</h1>
          </div>
        </header>

        <main>
          <Routes>
            <Route path="/estoque" element={<Estoque />} />
            <Route path="/" element={<Navigate to="/estoque" replace />} />
            <Route path="*" element={<Navigate to="/estoque" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
