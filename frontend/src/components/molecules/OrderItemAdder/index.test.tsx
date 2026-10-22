import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import OrderItemAdder from './index';

const mockProdutos = [
  {
    id: 1,
    nome: 'Produto Teste',
    sku: 'TEST-01',
    descricao: 'Descrição do produto teste',
    preco: 50.0,
    quantidade: 10,
    estoque_minimo: 1,
    categoria_id: 1,
    fornecedor_id: 1,
    criado_em: new Date(),
    atualizado_em: new Date(),
  },
];

describe('Molecule OrderItemAdder', () => {
  it('deve renderizar os campos de produto, quantidade e preço', () => {
    render(
      <OrderItemAdder
        produtos={mockProdutos}
        selectedProdutoId=""
        quantidade={1}
        preco=""
        onProdutoChange={vi.fn()}
        onQuantidadeChange={vi.fn()}
        onPrecoChange={vi.fn()}
        onAddItem={vi.fn()}
      />,
    );

    expect(screen.getByText('Adicionar Itens ao Pedido')).toBeDefined();
    expect(screen.getByLabelText('Produto')).toBeDefined();
    expect(screen.getByLabelText('Qtd.')).toBeDefined();
    expect(screen.getByLabelText('Preço Unit. (R$)')).toBeDefined();
  });

  it('deve disparar os callbacks ao alterar valores e clicar em adicionar', () => {
    const handleProdutoChange = vi.fn();
    const handleQtdChange = vi.fn();
    const handlePrecoChange = vi.fn();
    const handleAddItem = vi.fn();

    render(
      <OrderItemAdder
        produtos={mockProdutos}
        selectedProdutoId="1"
        quantidade={2}
        preco="45.00"
        onProdutoChange={handleProdutoChange}
        onQuantidadeChange={handleQtdChange}
        onPrecoChange={handlePrecoChange}
        onAddItem={handleAddItem}
      />,
    );

    fireEvent.change(screen.getByLabelText('Produto'), {
      target: { value: '1' },
    });
    expect(handleProdutoChange).toHaveBeenCalledWith('1');

    fireEvent.change(screen.getByLabelText('Qtd.'), {
      target: { value: '3' },
    });
    expect(handleQtdChange).toHaveBeenCalledWith(3);

    fireEvent.change(screen.getByLabelText('Preço Unit. (R$)'), {
      target: { value: '48.00' },
    });
    expect(handlePrecoChange).toHaveBeenCalledWith('48.00');

    fireEvent.click(screen.getByRole('button', { name: /\+ Adicionar/i }));
    expect(handleAddItem).toHaveBeenCalledTimes(1);
  });
});
