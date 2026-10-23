import React from 'react';
import './index.css';

export interface FiltrosVendaValores {
  busca: string;
  dataDe: string;
  dataAte: string;
  valorMin: string;
  valorMax: string;
}

interface FiltroVendasProps {
  filtros: FiltrosVendaValores;
  onFiltroChange: (novosFiltros: Partial<FiltrosVendaValores>) => void;
  onLimparFiltros: () => void;
}

const FiltroVendas: React.FC<FiltroVendasProps> = ({
  filtros,
  onFiltroChange,
  onLimparFiltros,
}) => {
  return (
    <div className="filtro-vendas-container">
      <h3 className="filtro-vendas-title">Produtos Vendidos</h3>

      <div className="filtro-vendas-form">
        <div className="filtro-item flex-grow-1" style={{ minWidth: '220px' }}>
          <label htmlFor="filtro-busca">Buscar</label>
          <input
            id="filtro-busca"
            type="text"
            placeholder="Produto ou cliente"
            value={filtros.busca}
            onChange={(e) => onFiltroChange({ busca: e.target.value })}
          />
        </div>

        <div className="filtro-item" style={{ width: '150px' }}>
          <label htmlFor="filtro-data-de">De</label>
          <input
            id="filtro-data-de"
            type="date"
            value={filtros.dataDe}
            onChange={(e) => onFiltroChange({ dataDe: e.target.value })}
          />
        </div>

        <div className="filtro-item" style={{ width: '150px' }}>
          <label htmlFor="filtro-data-ate">Até</label>
          <input
            id="filtro-data-ate"
            type="date"
            value={filtros.dataAte}
            onChange={(e) => onFiltroChange({ dataAte: e.target.value })}
          />
        </div>

        <div className="filtro-item" style={{ width: '120px' }}>
          <label htmlFor="filtro-valor-min">Valor mín.</label>
          <input
            id="filtro-valor-min"
            type="number"
            min="0"
            placeholder="0"
            value={filtros.valorMin}
            onChange={(e) => onFiltroChange({ valorMin: e.target.value })}
          />
        </div>

        <div className="filtro-item" style={{ width: '120px' }}>
          <label htmlFor="filtro-valor-max">Valor máx.</label>
          <input
            id="filtro-valor-max"
            type="number"
            min="0"
            placeholder="Sem limite"
            value={filtros.valorMax}
            onChange={(e) => onFiltroChange({ valorMax: e.target.value })}
          />
        </div>

        <div className="filtro-item">
          <label>&nbsp;</label>
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={onLimparFiltros}
            title="Limpar todos os filtros"
            style={{ height: '35px' }}
          >
            Limpar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FiltroVendas;
