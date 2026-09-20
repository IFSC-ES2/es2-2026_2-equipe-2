import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ProductCreateModal from '.';

describe('Organism ProductCreateModal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('não deve renderizar quando isOpen for falso', () => {
    render(
      <ProductCreateModal
        isOpen={false}
        onClose={vi.fn()}
        onSuccess={vi.fn()}
      />,
    );

    expect(screen.queryByText('Novo Produto')).toBeNull();
  });

  it('deve renderizar o título do modal e o formulário FormCreateProduct quando isOpen for verdadeiro', () => {
    render(
      <ProductCreateModal
        isOpen={true}
        onClose={vi.fn()}
        onSuccess={vi.fn()}
      />,
    );

    expect(screen.getByText('Novo Produto')).toBeDefined();
    expect(screen.getByLabelText(/SKU \*/i)).toBeDefined();
    expect(screen.getByLabelText(/Nome do Produto \*/i)).toBeDefined();
    expect(screen.getByText('Salvar Produto')).toBeDefined();
    expect(screen.getByText('Cancelar')).toBeDefined();
  });

  it('deve chamar onClose ao clicar no botão Cancelar', () => {
    const onClose = vi.fn();
    render(
      <ProductCreateModal
        isOpen={true}
        onClose={onClose}
        onSuccess={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByText('Cancelar'));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('deve chamar onSuccess e onClose quando o formulário for submetido com sucesso', async () => {
    const saveService = vi.fn().mockResolvedValueOnce({ id: 1 });
    const onSuccess = vi.fn();
    const onClose = vi.fn();

    render(
      <ProductCreateModal
        isOpen={true}
        onClose={onClose}
        onSuccess={onSuccess}
        saveService={saveService}
      />,
    );

    fireEvent.change(screen.getByLabelText(/SKU \*/i), { target: { value: 'SKU-01' } });
    fireEvent.change(screen.getByLabelText(/Nome do Produto \*/i), {
      target: { value: 'Produto Teste' },
    });
    fireEvent.change(screen.getByLabelText(/Preço/i), { target: { value: '15' } });

    fireEvent.click(screen.getByText('Salvar Produto'));

    await waitFor(() => {
      expect(saveService).toHaveBeenCalledTimes(1);
    });

    expect(onSuccess).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
