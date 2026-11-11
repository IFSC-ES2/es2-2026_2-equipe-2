import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from './index';
import * as dashboardService from '../../services/dashboard.service';

vi.mock('../../services/dashboard.service');
vi.mock('../../services/usuario.service', () => ({
  getUsuarioAtual: vi.fn().mockResolvedValue({
    id: 1,
    nome: 'Admin',
    email: 'admin@aura.com',
  }),
}));

const mockDadosDashboard: dashboardService.DadosDashboard = {
  kpi: {
    faturamentoTotal: 100000,
    totalProdutosVendidos: 3400,
    categoriaMaisVendida: 'Eletrônicos',
    produtoMaisVendido: 'iPhone 15 Pro',
  },
  vendasRecentes: [
    {
      id: '1',
      nomeProduto: 'Macbook Pro',
      quantidade: 2,
      preco: 2999,
      data: '20.09.2024',
    },
  ],
  graficoVendas: {
    '1S': [{ rotulo: 'Seg', valor: 1000 }],
    '1M': [{ rotulo: '18', valor: 20000 }],
    '3M': [{ rotulo: 'Out', valor: 50000 }],
    '1A': [{ rotulo: 'Jan', valor: 100000 }],
  },
  produtosEstoque: [
    {
      id: 1,
      nomeProduto: 'iPhone 14',
      codigoProduto: 'ELEC-1001',
      quantidade: 15,
      historicoEntrada: '20.11.2023',
      nomeCategoria: 'Eletrônicos',
    },
  ],
  distribuicaoCategorias: [
    { rotulo: 'Eletrônicos', quantidade: 15, porcentagem: 60, cor: '#f97316' },
  ],
};

describe('Dashboard Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar o título do Dashboard e seções de Vendas e Estoque em português quando houver dados', async () => {
    vi.mocked(dashboardService.buscarDadosDashboard).mockResolvedValue(
      mockDadosDashboard,
    );

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    );

    expect(screen.getByText('Carregando painel de controle...')).toBeDefined();

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { level: 2, name: 'Vendas' }),
      ).toBeDefined();
      expect(
        screen.getByRole('heading', { level: 2, name: 'Estoque' }),
      ).toBeDefined();
      expect(screen.getByText('Faturamento Total')).toBeDefined();
      expect(screen.getByText('Macbook Pro')).toBeDefined();
      expect(screen.getByText('iPhone 14')).toBeDefined();
    });
  });

  it('deve exibir mensagem de erro e não renderizar as seções quando a busca falhar', async () => {
    vi.mocked(dashboardService.buscarDadosDashboard).mockRejectedValue(
      new Error('Erro de conexão com API'),
    );

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText('Erro de conexão com API')).toBeDefined();
      expect(
        screen.queryByRole('heading', { level: 2, name: 'Vendas' }),
      ).toBeNull();
      expect(
        screen.queryByRole('heading', { level: 2, name: 'Estoque' }),
      ).toBeNull();
    });
  });

  it('deve exibir mensagem de erro por padrão quando nenhum dado for retornado', async () => {
    vi.mocked(dashboardService.buscarDadosDashboard).mockResolvedValue(
      null as unknown as dashboardService.DadosDashboard,
    );

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(
        screen.getByText('Nenhum dado encontrado para exibição no dashboard.'),
      ).toBeDefined();
      expect(
        screen.queryByRole('heading', { level: 2, name: 'Vendas' }),
      ).toBeNull();
      expect(
        screen.queryByRole('heading', { level: 2, name: 'Estoque' }),
      ).toBeNull();
    });
  });
});
