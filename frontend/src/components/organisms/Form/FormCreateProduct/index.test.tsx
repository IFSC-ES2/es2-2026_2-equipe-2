import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import FormCreateProduct from '.';

describe('Organism FormCreateProduct', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar os campos do formulário e botões de ação', () => {
    render(<FormCreateProduct onCancel={vi.fn()} />);

    expect(screen.getByLabelText(/SKU \*/i)).toBeDefined();
    expect(screen.getByLabelText(/Nome do Produto \*/i)).toBeDefined();
    expect(screen.getByLabelText(/Descrição/i)).toBeDefined();
    expect(screen.getByLabelText(/Categoria \(ID\)/i)).toBeDefined();
    expect(screen.getByLabelText(/Fornecedor \(ID\)/i)).toBeDefined();
    expect(screen.getByLabelText(/Preço/i)).toBeDefined();
    expect(screen.getByLabelText(/Quantidade Inicial/i)).toBeDefined();
    expect(screen.getByLabelText(/Estoque Mínimo/i)).toBeDefined();
    expect(screen.getByText('Salvar Produto')).toBeDefined();
    expect(screen.getByText('Cancelar')).toBeDefined();
  });

  it('deve exibir mensagem de erro de validação se campos obrigatórios não forem preenchidos', async () => {
    const saveService = vi.fn();
    render(<FormCreateProduct saveService={saveService} />);

    fireEvent.click(screen.getByText('Salvar Produto'));

    await waitFor(() => {
      expect(
        screen.getByText('Preencha os campos obrigatórios: SKU, Nome e Preço.'),
      ).toBeDefined();
    });

    expect(saveService).not.toHaveBeenCalled();
  });

  it('deve exibir mensagem de erro se o preço for negativo', async () => {
    const saveService = vi.fn();
    render(<FormCreateProduct saveService={saveService} />);

    fireEvent.change(screen.getByLabelText(/SKU \*/i), { target: { value: 'SKU-001' } });
    fireEvent.change(screen.getByLabelText(/Nome do Produto \*/i), {
      target: { value: 'Produto Teste' },
    });
    fireEvent.change(screen.getByLabelText(/Preço/i), { target: { value: '-5' } });

    fireEvent.click(screen.getByText('Salvar Produto'));

    await waitFor(() => {
      expect(
        screen.getByText('O preço deve ser um valor numérico maior ou igual a zero.'),
      ).toBeDefined();
    });

    expect(saveService).not.toHaveBeenCalled();
  });

  it('deve preencher os dados, chamar o saveService com payload correto e acionar onSuccess', async () => {
    const saveService = vi.fn().mockResolvedValueOnce({ id: 1 });
    const onSuccess = vi.fn();

    render(<FormCreateProduct saveService={saveService} onSuccess={onSuccess} />);

    fireEvent.change(screen.getByLabelText(/SKU \*/i), { target: { value: 'ABC-100' } });
    fireEvent.change(screen.getByLabelText(/Nome do Produto \*/i), {
      target: { value: 'Parafuso Aço' },
    });
    fireEvent.change(screen.getByLabelText(/Descrição/i), {
      target: { value: 'Pacote com 50 unidades' },
    });
    fireEvent.change(screen.getByLabelText(/Categoria \(ID\)/i), {
      target: { value: '2' },
    });
    fireEvent.change(screen.getByLabelText(/Fornecedor \(ID\)/i), {
      target: { value: '3' },
    });
    fireEvent.change(screen.getByLabelText(/Preço/i), { target: { value: '29.90' } });
    fireEvent.change(screen.getByLabelText(/Quantidade Inicial/i), {
      target: { value: '100' },
    });
    fireEvent.change(screen.getByLabelText(/Estoque Mínimo/i), {
      target: { value: '10' },
    });

    fireEvent.click(screen.getByText('Salvar Produto'));

    await waitFor(() => {
      expect(saveService).toHaveBeenCalledWith({
        sku: 'ABC-100',
        nome: 'Parafuso Aço',
        descricao: 'Pacote com 50 unidades',
        categoria_id: 2,
        fornecedor_id: 3,
        preco: 29.9,
        quantidade: 100,
        estoque_minimo: 10,
      });
    });

    expect(onSuccess).toHaveBeenCalledTimes(1);
  });

  it('deve acionar onCancel ao clicar no botão Cancelar', () => {
    const onCancel = vi.fn();
    render(<FormCreateProduct onCancel={onCancel} />);

    fireEvent.click(screen.getByText('Cancelar'));

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('deve exibir mensagem de erro quando saveService falhar', async () => {
    const saveService = vi.fn().mockRejectedValueOnce(new Error('SKU duplicado'));
    const onSuccess = vi.fn();

    render(<FormCreateProduct saveService={saveService} onSuccess={onSuccess} />);

    fireEvent.change(screen.getByLabelText(/SKU \*/i), { target: { value: 'ABC-100' } });
    fireEvent.change(screen.getByLabelText(/Nome do Produto \*/i), {
      target: { value: 'Parafuso Aço' },
    });
    fireEvent.change(screen.getByLabelText(/Preço/i), { target: { value: '10' } });

    fireEvent.click(screen.getByText('Salvar Produto'));

    await waitFor(() => {
      expect(screen.getByText('SKU duplicado')).toBeDefined();
    });

    expect(onSuccess).not.toHaveBeenCalled();
  });
});
