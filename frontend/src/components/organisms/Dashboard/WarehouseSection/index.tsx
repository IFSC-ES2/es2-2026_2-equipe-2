import React from 'react';
import DonutChart from '../../../molecules/Charts/DonutChart';
import DashboardTable, {
  type ColunaTabelaDashboard,
} from '../../../molecules/DashboardTable';
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

const colunasEstoque: ColunaTabelaDashboard[] = [
  { chave: 'nomeProduto', rotulo: 'PRODUTO', alinhamento: 'left' },
  { chave: 'codigoProduto', rotulo: 'CÓDIGO', alinhamento: 'left' },
  { chave: 'quantidade', rotulo: 'QUANTIDADE', alinhamento: 'center' },
  {
    chave: 'historicoEntrada',
    rotulo: 'DATA DE CADASTRO',
    alinhamento: 'right',
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
          <DashboardTable
            colunas={colunasEstoque}
            dados={produtos as unknown as Record<string, unknown>[]}
            tamanhoPaginaInicial={5}
            exibirSeletorTamanho={true}
            mensagemVazio="Nenhum produto em estoque."
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
