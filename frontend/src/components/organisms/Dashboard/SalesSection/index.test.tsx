import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SalesSection from './index';

describe('SalesSection Organism', () => {
  const mockKpi = {
    faturamentoTotal: 100000,
    totalProdutosVendidos: 3400,
    categoriaMaisVendida: 'Eletrônicos',
    produtoMaisVendido: 'iPhone 15 Pro',
  };

  const mockVendas = [
    {
      id: '1',
      nomeProduto: 'Macbook Pro',
      quantidade: 2,
      preco: 2999,
      data: '20.09.2024',
    },
  ];

  const mockGrafico = {
    '1S': [{ rotulo: 'Seg', valor: 1000 }],
    '1M': [{ rotulo: '18', valor: 20000 }],
    '3M': [{ rotulo: 'Out', valor: 50000 }],
    '1A': [{ rotulo: 'Jan', valor: 100000 }],
  };

  it('deve renderizar os 4 cards de KPI e a tabela de vendas em português', () => {
    render(
      <SalesSection
        kpi={mockKpi}
        vendasRecentes={mockVendas}
        graficoVendas={mockGrafico}
      />,
    );

    expect(screen.getByText('Vendas')).toBeDefined();
    expect(screen.getByText('Faturamento Total')).toBeDefined();
    expect(screen.getByText('Total de Produtos Vendidos')).toBeDefined();
    expect(screen.getByText('Categoria Mais Vendida')).toBeDefined();
    expect(screen.getByText('Produto Mais Vendido')).toBeDefined();
    expect(screen.getByText('PRODUTO')).toBeDefined();
    expect(screen.getByText('QUANTIDADE')).toBeDefined();
    expect(screen.getByText('PREÇO')).toBeDefined();
    expect(screen.getByText('DATA')).toBeDefined();
    expect(screen.getByText('Macbook Pro')).toBeDefined();
  });
});
