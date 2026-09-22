import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Estoque from '.';
import * as produtoService from '../../services/produto.service';

vi.mock('../../services/produto.service', () => ({
  getProdutos: vi.fn(),
  createProduto: vi.fn(),
}));

describe('Page Estoque', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar o estado de carregamento inicialmente', () => {
    vi.mocked(produtoService.getProdutos).mockImplementationOnce(
      () => new Promise(() => {}),
    );

    render(<Estoque />);

    expect(screen.getByText('Listagem dos Produtos')).toBeDefined();
    expect(screen.getByText('Carregando...')).toBeDefined();
  });

  it('deve renderizar mensagem de erro quando a chamada da API falhar', async () => {
    vi.mocked(produtoService.getProdutos).mockRejectedValueOnce(
      new Error('Erro ao buscar produtos'),
    );

    render(<Estoque />);

    await waitFor(() => {
      expect(screen.getByText('Erro ao buscar produtos')).toBeDefined();
    });
  });

  it('deve renderizar a tabela com os produtos quando a chamada for bem sucedida', async () => {
    vi.mocked(produtoService.getProdutos).mockResolvedValueOnce({
      columns: [
        { key: 'sku', label: 'SKU' },
        { key: 'nome', label: 'Nome' },
      ],
      data: [{ sku: 'SKU-001', nome: 'Produto A' }],
    });

    render(<Estoque />);

    await waitFor(() => {
      expect(screen.getByText('SKU-001')).toBeDefined();
      expect(screen.getByText('Produto A')).toBeDefined();
    });
  });

  it('deve abrir o modal de cadastro ao clicar em Novo Produto e recarregar os dados ao salvar', async () => {
    vi.mocked(produtoService.getProdutos).mockResolvedValue({
      columns: [{ key: 'id', label: 'ID' }],
      data: [{ id: 1 }],
    });

    render(<Estoque />);

    await waitFor(() => {
      expect(screen.getByText('Novo Produto')).toBeDefined();
    });

    // Modal fechado inicialmente
    expect(screen.queryByLabelText(/SKU \*/i)).toBeNull();

    // Clica em Novo Produto
    fireEvent.click(screen.getByText('Novo Produto'));

    await waitFor(() => {
      expect(screen.getByLabelText(/SKU \*/i)).toBeDefined();
      expect(screen.getByLabelText(/Nome do Produto \*/i)).toBeDefined();
      expect(screen.getByText('Salvar Produto')).toBeDefined();
    });

    // Preenche o formulário e salva
    fireEvent.change(screen.getByLabelText(/SKU \*/i), {
      target: { value: 'NOVO-SKU' },
    });
    fireEvent.change(screen.getByLabelText(/Nome do Produto \*/i), {
      target: { value: 'Produto Novo' },
    });
    fireEvent.change(screen.getByLabelText(/Preço/i), {
      target: { value: '50' },
    });

    vi.mocked(produtoService.createProduto).mockResolvedValueOnce({
      id: 2,
      sku: 'NOVO-SKU',
      nome: 'Produto Novo',
      descricao: null,
      categoria_id: null,
      fornecedor_id: null,
      preco: 50,
      quantidade: 0,
      estoque_minimo: 0,
      criado_em: new Date(),
      atualizado_em: new Date(),
    });

    fireEvent.click(screen.getByText('Salvar Produto'));

    await waitFor(() => {
      expect(screen.queryByLabelText(/SKU \*/i)).toBeNull();
    });

    // Verifica que getProdutos foi chamado novamente para recarregar
    expect(produtoService.getProdutos).toHaveBeenCalledTimes(2);
  });
});
