import { describe, it, expect, vi, afterEach } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Modal from '.';

describe('Organism Modal', () => {
  afterEach(() => {
    vi.clearAllMocks();
    document.body.className = '';
  });

  it('não deve renderizar nada quando isOpen for falso', () => {
    render(
      <Modal isOpen={false} onClose={vi.fn()} title="Título Teste">
        <p>Conteúdo do Modal</p>
      </Modal>,
    );

    expect(screen.queryByText('Título Teste')).toBeNull();
    expect(screen.queryByText('Conteúdo do Modal')).toBeNull();
    expect(document.body.classList.contains('modal-open')).toBe(false);
  });

  it('deve renderizar título e conteúdo quando isOpen for verdadeiro', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} title="Meu Modal" footer={<button>Ação</button>}>
        <p>Conteúdo Interno</p>
      </Modal>,
    );

    expect(screen.getByText('Meu Modal')).toBeDefined();
    expect(screen.getByText('Conteúdo Interno')).toBeDefined();
    expect(screen.getByText('Ação')).toBeDefined();
    expect(document.body.classList.contains('modal-open')).toBe(true);
  });

  it('deve chamar onClose ao clicar no botão fechar (X)', () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose} title="Modal Fechar">
        <p>Conteúdo</p>
      </Modal>,
    );

    const closeButton = screen.getByLabelText('Fechar');
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('deve chamar onClose ao clicar no backdrop', () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose} title="Modal Backdrop">
        <p>Conteúdo</p>
      </Modal>,
    );

    const backdrop = screen.getByTestId('modal-backdrop');
    fireEvent.click(backdrop);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('deve chamar onClose ao pressionar a tecla Escape', () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose} title="Modal Escape">
        <p>Conteúdo</p>
      </Modal>,
    );

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
