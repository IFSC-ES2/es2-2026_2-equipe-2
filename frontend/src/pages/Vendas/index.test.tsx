import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Vendas from './index';
import * as pedidoService from '../../services/pedido.service';
import type { PedidoComRelacionamentos } from '../../interfaces/pedido.interface';

vi.mock('../../services/pedido.service');
vi.mock('../../services/cliente.service', () => ({
  getClientes: vi.fn().mockResolvedValue({ columns: [], data: [] }),
}));
vi.mock('../../services/produto.service', () => ({
  getProdutos: vi.fn().mockResolvedValue({ columns: [], data: [] }),
}));

const mockPedidos: PedidoComRelacionamentos[] = [
  {
    id: 1,
    cliente_id: 1,
    status: 'CONCLUIDO',
    data_pedido: '2026-10-20T12:00:00Z',
    valor_total: 646.5,
    cliente: {
      id: 1,
      nome: 'Pet Shop Amigo Fiel',
      email: 'pet@email.com',
      documento: '12345678000100',
      telefone: '48999999999',
      endereco: 'Rua Pet',
      criado_em: new Date().toISOString(),
    },
    itens: [
      {
        id: 101,
        pedido_id: 1,
        produto_id: 10,
        quantidade: 3,
        preco_unitario: 215.5,
        produto: {
          id: 10,
          nome: 'Caixa de Som JBL Go 3',
          sku: 'JBL-01',
          descricao: 'Caixa bluetooth',
          preco: 215.5,
          quantidade: 15,
          estoque_minimo: 2,
          categoria_id: 5,
          fornecedor_id: 1,
          criado_em: new Date(),
          atualizado_em: new Date(),
        },
      },
    ],
  },
];

describe('Page Vendas', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(pedidoService.getPedidos).mockResolvedValue(mockPedidos);
  });

  it('deve renderizar o título da página e elementos do dashboard', async () => {
    render(
      <MemoryRouter>
        <Vendas />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(
        screen.getByText('Faturamento acumulado do período'),
      ).toBeDefined();
      expect(screen.getByText('Produtos Vendidos')).toBeDefined();
      expect(screen.getByText('Pet Shop Amigo Fiel')).toBeDefined();
      expect(
        screen.getAllByText('Caixa de Som JBL Go 3').length,
      ).toBeGreaterThan(0);
    });
  });

  it('deve abrir o modal de cadastro ao clicar no botão Registrar Pedido', async () => {
    render(
      <MemoryRouter>
        <Vendas />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /Registrar Pedido/i }),
      ).toBeDefined();
    });

    fireEvent.click(screen.getByRole('button', { name: /Registrar Pedido/i }));

    await waitFor(() => {
      expect(screen.getByText('Criar Novo Pedido')).toBeDefined();
    });
  });

  it('deve filtrar a listagem ao digitar no campo Buscar', async () => {
    render(
      <MemoryRouter>
        <Vendas />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(
        screen.getAllByText('Caixa de Som JBL Go 3').length,
      ).toBeGreaterThan(0);
    });

    const inputBusca = screen.getByPlaceholderText('Produto ou cliente');
    fireEvent.change(inputBusca, { target: { value: 'Inexistente' } });

    await waitFor(() => {
      expect(screen.getByText('Nenhum registro encontrado.')).toBeDefined();
    });
  });

  it('deve excluir o pedido ao clicar no botão de delete e confirmar', async () => {
    const mockDelete = vi
      .mocked(pedidoService.deletePedido)
      .mockResolvedValue(true);

    render(
      <MemoryRouter>
        <Vendas />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByTitle('Excluir')).toBeDefined();
    });

    fireEvent.click(screen.getByTitle('Excluir'));

    // Clica no botão Confirmar dentro do Modal de confirmação
    await waitFor(() => {
      expect(screen.getByText('Confirmar exclusão')).toBeDefined();
    });

    fireEvent.click(screen.getByRole('button', { name: 'Confirmar' }));

    await waitFor(() => {
      expect(mockDelete).toHaveBeenCalledWith(1);
    });
  });
});
