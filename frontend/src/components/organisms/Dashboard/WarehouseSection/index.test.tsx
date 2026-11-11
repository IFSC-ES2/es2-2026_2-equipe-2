import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import WarehouseSection from './index';

describe('WarehouseSection Organism', () => {
  const mockProdutos = [
    {
      id: 1,
      nomeProduto: 'iPhone 14',
      codigoProduto: 'ELEC-1001',
      quantidade: 15,
      historicoEntrada: '20.11.2023',
      nomeCategoria: 'Eletrônicos',
    },
  ];

  const mockDistribuicao = [
    { rotulo: 'Eletrônicos', quantidade: 15, porcentagem: 60, cor: '#f97316' },
    { rotulo: 'Roupas', quantidade: 5, porcentagem: 40, cor: '#2f9bd6' },
  ];

  it('deve renderizar a seção de estoque com tabela de produtos e gráfico donut em português', () => {
    render(
      <WarehouseSection
        produtos={mockProdutos}
        distribuicaoCategorias={mockDistribuicao}
      />,
    );

    expect(screen.getByText('Estoque')).toBeDefined();
    expect(screen.getByText('PRODUTO')).toBeDefined();
    expect(screen.getByText('CÓDIGO')).toBeDefined();
    expect(screen.getByText('QUANTIDADE')).toBeDefined();
    expect(screen.getByText('DATA DE CADASTRO')).toBeDefined();
    expect(screen.getByText('iPhone 14')).toBeDefined();
    expect(screen.getByText('ELEC-1001')).toBeDefined();
    expect(screen.getByText('Eletrônicos')).toBeDefined();
    expect(screen.getByText('60%')).toBeDefined();
  });
});
