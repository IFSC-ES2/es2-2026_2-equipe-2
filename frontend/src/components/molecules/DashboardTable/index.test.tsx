import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import DashboardTable from './index';

describe('DashboardTable Molecule', () => {
  const mockColunas = [
    { chave: 'nome', rotulo: 'NOME DO PRODUTO' },
    { chave: 'qtd', rotulo: 'QUANTIDADE' },
    { chave: 'preco', rotulo: 'PREÇO' },
  ];

  const mockDados = [
    { id: 1, nome: 'Macbook Pro', qtd: 2, preco: 'R$ 2999' },
    { id: 2, nome: 'Macbook Air', qtd: 4, preco: 'R$ 1499' },
  ];

  it('deve renderizar os cabeçalhos das colunas e as linhas de dados em português', () => {
    render(<DashboardTable colunas={mockColunas} dados={mockDados} />);
    expect(screen.getByText('NOME DO PRODUTO')).toBeDefined();
    expect(screen.getByText('QUANTIDADE')).toBeDefined();
    expect(screen.getByText('PREÇO')).toBeDefined();
    expect(screen.getByText('Macbook Pro')).toBeDefined();
    expect(screen.getByText('Macbook Air')).toBeDefined();
  });

  it('deve exibir mensagem quando a tabela estiver vazia', () => {
    render(
      <DashboardTable
        colunas={mockColunas}
        dados={[]}
        mensagemVazio="Sem produtos disponíveis"
      />,
    );
    expect(screen.getByText('Sem produtos disponíveis')).toBeDefined();
  });

  it('deve manter compatibilidade com colunas e dados legados', () => {
    const mockLegacyColumns = [
      { key: 'nome', label: 'PRODUCT NAME' },
      { key: 'qtd', label: 'QUANTITY' },
    ];
    render(<DashboardTable columns={mockLegacyColumns} data={mockDados} />);
    expect(screen.getByText('PRODUCT NAME')).toBeDefined();
    expect(screen.getByText('QUANTITY')).toBeDefined();
  });
});
