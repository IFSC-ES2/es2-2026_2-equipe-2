import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import OrderCreateModal from './index';
import * as clienteService from '../../../../services/cliente.service';
import * as produtoService from '../../../../services/produto.service';
import * as pedidoService from '../../../../services/pedido.service';
import type { TableDataRow } from '../../Table';
import type { PedidoComRelacionamentos } from '../../../../interfaces/pedido.interface';

vi.mock('../../../../services/cliente.service');
vi.mock('../../../../services/produto.service');
vi.mock('../../../../services/pedido.service');

const mockClientes = [
  {
    id: 1,
    nome: 'João Silva',
    email: 'joao@email.com',
    documento: '12345678900',
    telefone: '48999999999',
    endereco: 'Rua A',
    criado_em: new Date().toISOString(),
  },
];

const mockProdutos = [
  {
    id: 10,
    nome: 'Mouse Sem Fio',
    sku: 'MOU-01',
    descricao: 'Mouse ergonômico',
    preco: 100,
    quantidade: 50,
    estoque_minimo: 5,
    categoria_id: 1,
    fornecedor_id: 1,
    criado_em: new Date(),
    atualizado_em: new Date(),
  },
];

describe('Organism OrderCreateModal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(clienteService.getClientes).mockResolvedValue({
      columns: [],
      data: mockClientes as unknown as TableDataRow[],
    });
    vi.mocked(produtoService.getProdutos).mockResolvedValue({
      columns: [],
      data: mockProdutos as unknown as TableDataRow[],
    });
  });

  it('não deve renderizar quando isOpen for false', () => {
    const { container } = render(
      <OrderCreateModal isOpen={false} onClose={vi.fn()} onSuccess={vi.fn()} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it('deve renderizar o título de criar novo pedido', async () => {
    render(
      <OrderCreateModal isOpen={true} onClose={vi.fn()} onSuccess={vi.fn()} />,
    );

    await waitFor(() => {
      expect(screen.getByText('Criar Novo Pedido')).toBeDefined();
    });
  });

  it('deve renderizar o título de edição quando um pedido for passado', async () => {
    const mockOrder: PedidoComRelacionamentos = {
      id: 99,
      cliente_id: 1,
      status: 'PENDENTE',
      data_pedido: '2026-10-21',
      valor_total: 100,
      itens: [
        {
          id: 1,
          pedido_id: 99,
          produto_id: 10,
          quantidade: 1,
          preco_unitario: 100,
          produto: mockProdutos[0],
        },
      ],
    };

    render(
      <OrderCreateModal
        isOpen={true}
        onClose={vi.fn()}
        onSuccess={vi.fn()}
        order={mockOrder}
      />,
    );

    await waitFor(() => {
      expect(screen.getByText('Editar Pedido #99')).toBeDefined();
      expect(screen.getByText('Mouse Sem Fio')).toBeDefined();
    });
  });

  it('deve permitir adicionar um produto e criar o pedido com sucesso', async () => {
    const mockCreate = vi.mocked(pedidoService.createPedido).mockResolvedValue({
      id: 123,
      cliente_id: 1,
      status: 'PENDENTE',
      data_pedido: new Date(),
      valor_total: 100,
    });

    const handleSuccess = vi.fn();
    const handleClose = vi.fn();

    render(
      <OrderCreateModal
        isOpen={true}
        onClose={handleClose}
        onSuccess={handleSuccess}
      />,
    );

    await waitFor(() => {
      expect(screen.getByText('Criar Novo Pedido')).toBeDefined();
    });

    // Seleciona o cliente
    const selectCliente = screen.getByLabelText(/Cliente/i);
    fireEvent.change(selectCliente, { target: { value: '1' } });

    // Seleciona o produto
    const selectProduto = screen.getByLabelText(/^Produto$/i);
    fireEvent.change(selectProduto, { target: { value: '10' } });

    // Clica em adicionar item
    const btnAdd = screen.getByRole('button', { name: /\+ Adicionar/i });
    fireEvent.click(btnAdd);

    // Verifica se o item foi adicionado
    expect(screen.getByText('Mouse Sem Fio')).toBeDefined();

    // Submete o pedido
    const btnSubmit = screen.getByRole('button', { name: /Criar Pedido/i });
    fireEvent.click(btnSubmit);

    await waitFor(() => {
      expect(mockCreate).toHaveBeenCalledTimes(1);
      expect(handleSuccess).toHaveBeenCalledTimes(1);
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });

  it('deve exibir erro caso o preço editado ultrapasse o limite de desconto de 15%', async () => {
    render(
      <OrderCreateModal isOpen={true} onClose={vi.fn()} onSuccess={vi.fn()} />,
    );

    await waitFor(() => {
      expect(screen.getByText('Criar Novo Pedido')).toBeDefined();
    });

    // Seleciona o produto (preço base 100, 15% de desconto = min 85)
    const selectProduto = screen.getByLabelText(/^Produto$/i);
    fireEvent.change(selectProduto, { target: { value: '10' } });

    const inputPreco = screen.getByLabelText(/Preço Unit/i);
    expect((inputPreco as HTMLInputElement).value).toBe('100');

    // Edita o preço para 80 (desconto de 20%, inválido)
    fireEvent.change(inputPreco, { target: { value: '80' } });

    expect(
      screen.getByText(/O desconto ultrapassou o limite permitido de 15%/i),
    ).toBeDefined();
  });
});
