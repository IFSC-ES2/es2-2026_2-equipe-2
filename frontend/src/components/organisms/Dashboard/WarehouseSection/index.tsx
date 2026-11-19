import React from 'react';
import DonutChart from '../../../molecules/Charts/DonutChart';
import Table, { type Column } from '../../Table';
import type {
  ItemProdutoEstoque,
  ItemDistribuicaoCategoria,
} from '../../../../interfaces/dashboard.interface';
import './index.css';

export interface WarehouseSectionProps {
  produtos: ItemProdutoEstoque[];
  distribuicaoCategorias: ItemDistribuicaoCategoria[];
  className?: string;
}

const colunasEstoque: Column[] = [
  { key: 'nomeProduto', label: 'PRODUTO', align: 'left' },
  { key: 'codigoProduto', label: 'CÓDIGO', align: 'left' },
  { key: 'quantidade', label: 'QUANTIDADE', align: 'center' },
  {
    key: 'historicoEntrada',
    label: 'DATA DE CADASTRO',
    align: 'right',
  },
];

const WarehouseSection: React.FC<WarehouseSectionProps> = ({
  produtos,
  distribuicaoCategorias,
  className = '',
}) => {
  return (
    <section className={`warehouse-section ${className}`.trim()}>
      <h2 className="dashboard-section-title">Estoque</h2>

      <div className="warehouse-content-grid">
        <div className="dashboard-card warehouse-table-card shadow-sm">
          <Table
            colunas={colunasEstoque}
            dados={produtos as unknown as Record<string, unknown>[]}
            tamanhoPaginaInicial={5}
            exibirSeletorTamanho={true}
            mensagemVazio="Nenhum produto em estoque."
            showActions={false}
          />
        </div>

        <div className="dashboard-card warehouse-donut-card shadow-sm">
          <DonutChart dados={distribuicaoCategorias} />
        </div>
      </div>
    </section>
  );
};

export const SecaoEstoque = WarehouseSection;
export default WarehouseSection;
